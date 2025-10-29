import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
export declare class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private prisma;
    server: Server;
    private userSockets;
    private familyRooms;
    constructor(jwtService: JwtService, prisma: PrismaService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    emitQuestCreated(familyId: number, quest: any): void;
    emitQuestSubmitted(familyId: number, quest: any): void;
    emitQuestVerified(familyId: number, quest: any, approved: boolean): void;
    emitRewardRedeemed(familyId: number, reward: any): void;
    emitRewardApproved(familyId: number, reward: any): void;
    emitLevelUp(familyId: number, user: any, newLevel: number): void;
    emitActivity(familyId: number, activity: any): void;
    emitNotification(familyId: number, type: string, data: any, message: string): void;
    emitToUser(userId: number, type: string, data: any, message: string): void;
    handleJoinFamily(client: Socket, data: {
        familyId: number;
    }): Promise<void>;
    handleLeaveFamily(client: Socket, data: {
        familyId: number;
    }): Promise<void>;
}
