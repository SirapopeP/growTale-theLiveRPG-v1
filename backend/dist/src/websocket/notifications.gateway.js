"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
let NotificationsGateway = class NotificationsGateway {
    jwtService;
    prisma;
    server;
    userSockets = new Map();
    familyRooms = new Map();
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async handleConnection(client) {
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
            this.userSockets.set(user.id, client.id);
            const familyMember = user.familyMembers[0];
            if (familyMember) {
                const familyId = familyMember.familyId;
                client.join(`family:${familyId}`);
                if (!this.familyRooms.has(familyId)) {
                    this.familyRooms.set(familyId, new Set());
                }
                this.familyRooms.get(familyId).add(client.id);
                console.log(`User ${user.displayName} connected to family ${familyId}`);
            }
            client.emit('connected', { message: 'Connected to notifications' });
        }
        catch (error) {
            console.error('WebSocket connection error:', error);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        for (const [userId, socketId] of this.userSockets.entries()) {
            if (socketId === client.id) {
                this.userSockets.delete(userId);
                break;
            }
        }
        for (const [familyId, socketIds] of this.familyRooms.entries()) {
            socketIds.delete(client.id);
            if (socketIds.size === 0) {
                this.familyRooms.delete(familyId);
            }
        }
        console.log(`Client disconnected: ${client.id}`);
    }
    emitQuestCreated(familyId, quest) {
        this.server.to(`family:${familyId}`).emit('quest:created', {
            type: 'quest:created',
            data: quest,
            message: `Quest ใหม่: ${quest.title}`,
        });
    }
    emitQuestSubmitted(familyId, quest) {
        this.server.to(`family:${familyId}`).emit('quest:submitted', {
            type: 'quest:submitted',
            data: quest,
            message: `${quest.assignee?.displayName} ส่ง Quest: ${quest.title}`,
        });
    }
    emitQuestVerified(familyId, quest, approved) {
        this.server.to(`family:${familyId}`).emit('quest:verified', {
            type: 'quest:verified',
            data: quest,
            approved,
            message: approved
                ? `Quest ผ่านการอนุมัติ: ${quest.title}`
                : `Quest ถูกปฏิเสธ: ${quest.title}`,
        });
    }
    emitRewardRedeemed(familyId, reward) {
        this.server.to(`family:${familyId}`).emit('reward:redeemed', {
            type: 'reward:redeemed',
            data: reward,
            message: `${reward.user?.displayName} ขอแลก Reward: ${reward.reward?.title}`,
        });
    }
    emitRewardApproved(familyId, reward) {
        this.server.to(`family:${familyId}`).emit('reward:approved', {
            type: 'reward:approved',
            data: reward,
            message: `ได้รับ Reward: ${reward.reward?.title}`,
        });
    }
    emitLevelUp(familyId, user, newLevel) {
        this.server.to(`family:${familyId}`).emit('level:up', {
            type: 'level:up',
            data: { user, newLevel },
            message: `🎉 ${user.displayName} Level Up! ถึง Level ${newLevel}`,
        });
    }
    emitActivity(familyId, activity) {
        this.server.to(`family:${familyId}`).emit('activity:new', {
            type: 'activity:new',
            data: activity,
            message: activity.message,
        });
    }
    emitNotification(familyId, type, data, message) {
        this.server.to(`family:${familyId}`).emit('notification', {
            type,
            data,
            message,
            timestamp: new Date().toISOString(),
        });
    }
    emitToUser(userId, type, data, message) {
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
    async handleJoinFamily(client, data) {
        const { familyId } = data;
        client.join(`family:${familyId}`);
        if (!this.familyRooms.has(familyId)) {
            this.familyRooms.set(familyId, new Set());
        }
        this.familyRooms.get(familyId).add(client.id);
        client.emit('joined_family', { familyId });
    }
    async handleLeaveFamily(client, data) {
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
};
exports.NotificationsGateway = NotificationsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_family'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], NotificationsGateway.prototype, "handleJoinFamily", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave_family'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], NotificationsGateway.prototype, "handleLeaveFamily", null);
exports.NotificationsGateway = NotificationsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], NotificationsGateway);
//# sourceMappingURL=notifications.gateway.js.map