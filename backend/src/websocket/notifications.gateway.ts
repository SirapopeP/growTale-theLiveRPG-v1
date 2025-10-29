import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<number, string>(); // userId -> socketId
  private familyRooms = new Map<number, Set<string>>(); // familyId -> Set of socketIds

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          familyMembers: {
            include: {
              family: true,
            },
          },
        },
      });

      if (!user) {
        client.disconnect();
        return;
      }

      // Store user socket mapping
      this.userSockets.set(user.id, client.id);

      // Join family room
      const familyMember = user.familyMembers[0];
      if (familyMember) {
        const familyId = familyMember.familyId;
        client.join(`family:${familyId}`);
        
        if (!this.familyRooms.has(familyId)) {
          this.familyRooms.set(familyId, new Set());
        }
        this.familyRooms.get(familyId)!.add(client.id);

        console.log(`User ${user.displayName} connected to family ${familyId}`);
      }

      client.emit('connected', { message: 'Connected to notifications' });
    } catch (error) {
      console.error('WebSocket connection error:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // Remove user from mappings
    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === client.id) {
        this.userSockets.delete(userId);
        break;
      }
    }

    // Remove from family rooms
    for (const [familyId, socketIds] of this.familyRooms.entries()) {
      socketIds.delete(client.id);
      if (socketIds.size === 0) {
        this.familyRooms.delete(familyId);
      }
    }

    console.log(`Client disconnected: ${client.id}`);
  }

  // Quest Events
  emitQuestCreated(familyId: number, quest: any) {
    this.server.to(`family:${familyId}`).emit('quest:created', {
      type: 'quest:created',
      data: quest,
      message: `Quest ใหม่: ${quest.title}`,
    });
  }

  emitQuestSubmitted(familyId: number, quest: any) {
    this.server.to(`family:${familyId}`).emit('quest:submitted', {
      type: 'quest:submitted',
      data: quest,
      message: `${quest.assignee?.displayName} ส่ง Quest: ${quest.title}`,
    });
  }

  emitQuestVerified(familyId: number, quest: any, approved: boolean) {
    this.server.to(`family:${familyId}`).emit('quest:verified', {
      type: 'quest:verified',
      data: quest,
      approved,
      message: approved 
        ? `Quest ผ่านการอนุมัติ: ${quest.title}` 
        : `Quest ถูกปฏิเสธ: ${quest.title}`,
    });
  }

  // Reward Events
  emitRewardRedeemed(familyId: number, reward: any) {
    this.server.to(`family:${familyId}`).emit('reward:redeemed', {
      type: 'reward:redeemed',
      data: reward,
      message: `${reward.user?.displayName} ขอแลก Reward: ${reward.reward?.title}`,
    });
  }

  emitRewardApproved(familyId: number, reward: any) {
    this.server.to(`family:${familyId}`).emit('reward:approved', {
      type: 'reward:approved',
      data: reward,
      message: `ได้รับ Reward: ${reward.reward?.title}`,
    });
  }

  // Level Up Event
  emitLevelUp(familyId: number, user: any, newLevel: number) {
    this.server.to(`family:${familyId}`).emit('level:up', {
      type: 'level:up',
      data: { user, newLevel },
      message: `🎉 ${user.displayName} Level Up! ถึง Level ${newLevel}`,
    });
  }

  // Activity Events
  emitActivity(familyId: number, activity: any) {
    this.server.to(`family:${familyId}`).emit('activity:new', {
      type: 'activity:new',
      data: activity,
      message: activity.message,
    });
  }

  // Generic notification
  emitNotification(familyId: number, type: string, data: any, message: string) {
    this.server.to(`family:${familyId}`).emit('notification', {
      type,
      data,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  // Send notification to specific user
  emitToUser(userId: number, type: string, data: any, message: string) {
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('notification', {
        type,
        data,
        message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @SubscribeMessage('join_family')
  async handleJoinFamily(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { familyId: number },
  ) {
    const { familyId } = data;
    client.join(`family:${familyId}`);
    
    if (!this.familyRooms.has(familyId)) {
      this.familyRooms.set(familyId, new Set());
    }
    this.familyRooms.get(familyId)!.add(client.id);
    
    client.emit('joined_family', { familyId });
  }

  @SubscribeMessage('leave_family')
  async handleLeaveFamily(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { familyId: number },
  ) {
    const { familyId } = data;
    client.leave(`family:${familyId}`);
    
    const familyRoom = this.familyRooms.get(familyId);
    if (familyRoom) {
      familyRoom.delete(client.id);
      if (familyRoom.size === 0) {
        this.familyRooms.delete(familyId);
      }
    }
    
    client.emit('left_family', { familyId });
  }
}
