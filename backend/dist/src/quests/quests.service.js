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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let QuestsService = class QuestsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createQuest(userId, createQuestDto) {
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId },
            include: { family: true },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('User must be in a family to create quests');
        }
        if (userFamily.role !== 'Parent') {
            throw new common_1.ForbiddenException('Only parents can create quests');
        }
        const quest = await this.prisma.quest.create({
            data: {
                familyId: userFamily.familyId,
                createdBy: userId,
                assignedTo: createQuestDto.assignedTo,
                title: createQuestDto.title,
                description: createQuestDto.description,
                category: createQuestDto.category,
                rewardExp: createQuestDto.rewardExp || 0,
                rewardCoin: createQuestDto.rewardCoin || 0,
                dueDate: createQuestDto.dueDate ? new Date(createQuestDto.dueDate) : null,
            },
            include: {
                assignee: {
                    include: {
                        profile: true,
                    },
                },
                creator: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        await this.prisma.activity.create({
            data: {
                familyId: userFamily.familyId,
                userId,
                type: 'quest_created',
                message: `สร้าง Quest: ${quest.title}`,
                refId: quest.id,
            },
        });
        return quest;
    }
    async getQuests(userId, status, assignedTo) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { userRole: true },
        });
        const isAdmin = user?.userRole?.role === 'Admin';
        let where = {};
        if (isAdmin) {
            where = {};
        }
        else {
            const userFamily = await this.prisma.familyMember.findFirst({
                where: { userId },
                include: { family: true },
            });
            if (!userFamily) {
                throw new common_1.ForbiddenException('User must be in a family to view quests');
            }
            where.familyId = userFamily.familyId;
        }
        if (status) {
            where.status = status;
        }
        if (assignedTo) {
            where.assignedTo = assignedTo;
        }
        const quests = await this.prisma.quest.findMany({
            where,
            include: {
                assignee: {
                    include: {
                        profile: true,
                    },
                },
                creator: {
                    include: {
                        profile: true,
                    },
                },
                questLogs: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return quests;
    }
    async getQuest(questId, userId) {
        const quest = await this.prisma.quest.findUnique({
            where: { id: questId },
            include: {
                assignee: {
                    include: {
                        profile: true,
                    },
                },
                creator: {
                    include: {
                        profile: true,
                    },
                },
                questLogs: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!quest) {
            throw new common_1.NotFoundException('Quest not found');
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { userRole: true } });
        const isAdmin = user?.userRole?.role === 'Admin';
        if (!isAdmin) {
            const userFamily = await this.prisma.familyMember.findFirst({
                where: { userId, familyId: quest.familyId },
            });
            if (!userFamily) {
                throw new common_1.ForbiddenException('You can only view quests from your family');
            }
        }
        return quest;
    }
    async startQuest(questId, userId) {
        const quest = await this.getQuest(questId, userId);
        if (quest.assignedTo !== userId) {
            throw new common_1.ForbiddenException('You can only start quests assigned to you');
        }
        if (quest.status !== 'pending') {
            throw new common_1.BadRequestException('Quest is not in pending status');
        }
        const updatedQuest = await this.prisma.quest.update({
            where: { id: questId },
            data: { status: 'in_progress' },
            include: {
                assignee: {
                    include: {
                        profile: true,
                    },
                },
                creator: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        await this.prisma.questLog.create({
            data: {
                questId,
                userId,
                action: 'started',
                note: 'เริ่มทำ Quest',
            },
        });
        return updatedQuest;
    }
    async submitQuest(questId, userId, submitQuestDto) {
        const quest = await this.getQuest(questId, userId);
        if (quest.assignedTo !== userId) {
            throw new common_1.ForbiddenException('You can only submit quests assigned to you');
        }
        if (quest.status !== 'in_progress') {
            throw new common_1.BadRequestException('Quest is not in progress');
        }
        const updatedQuest = await this.prisma.quest.update({
            where: { id: questId },
            data: { status: 'submitted' },
            include: {
                assignee: {
                    include: {
                        profile: true,
                    },
                },
                creator: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        await this.prisma.questLog.create({
            data: {
                questId,
                userId,
                action: 'submitted',
                note: submitQuestDto.note,
                evidenceUrl: submitQuestDto.evidenceUrl,
            },
        });
        await this.prisma.activity.create({
            data: {
                familyId: quest.familyId,
                userId,
                type: 'quest_submitted',
                message: `ส่ง Quest: ${quest.title}`,
                refId: quest.id,
            },
        });
        return updatedQuest;
    }
    async verifyQuest(questId, userId, approved) {
        const quest = await this.getQuest(questId, userId);
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId, familyId: quest.familyId },
        });
        if (!userFamily || userFamily.role !== 'Parent') {
            throw new common_1.ForbiddenException('Only parents can verify quests');
        }
        if (quest.status !== 'submitted') {
            throw new common_1.BadRequestException('Quest is not in submitted status');
        }
        const newStatus = approved ? 'completed' : 'pending';
        const updatedQuest = await this.prisma.quest.update({
            where: { id: questId },
            data: { status: newStatus },
            include: {
                assignee: {
                    include: {
                        profile: true,
                    },
                },
                creator: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        await this.prisma.questLog.create({
            data: {
                questId,
                userId,
                action: approved ? 'verified' : 'rejected',
                note: approved ? 'Quest ผ่านการอนุมัติ' : 'Quest ถูกปฏิเสธ',
            },
        });
        if (approved && quest.assignee) {
            await this.updateUserProfile(quest.assignee.id, quest.rewardExp, quest.rewardCoin);
            await this.prisma.activity.create({
                data: {
                    familyId: quest.familyId,
                    userId: quest.assignee.id,
                    type: 'quest_completed',
                    message: `สำเร็จ Quest: ${quest.title} (+${quest.rewardExp} EXP, +${quest.rewardCoin} Coin)`,
                    refId: quest.id,
                },
            });
        }
        return updatedQuest;
    }
    async deleteQuest(questId, userId) {
        const quest = await this.getQuest(questId, userId);
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId, familyId: quest.familyId },
        });
        if (!userFamily || userFamily.role !== 'Parent') {
            throw new common_1.ForbiddenException('Only parents can delete quests');
        }
        if (quest.createdBy !== userId) {
            throw new common_1.ForbiddenException('You can only delete quests you created');
        }
        await this.prisma.quest.delete({
            where: { id: questId },
        });
        return { message: 'Quest deleted successfully' };
    }
    async updateUserProfile(userId, exp, coin) {
        const profile = await this.prisma.profile.findUnique({
            where: { userId },
        });
        if (!profile) {
            return;
        }
        const newExp = profile.exp + exp;
        const newCoin = profile.coin + coin;
        let newLevel = profile.level;
        let expForNextLevel = Math.floor(100 * Math.pow(newLevel + 1, 1.5));
        while (newExp >= expForNextLevel) {
            newLevel++;
            expForNextLevel = Math.floor(100 * Math.pow(newLevel + 1, 1.5));
        }
        await this.prisma.profile.update({
            where: { userId },
            data: {
                exp: newExp,
                coin: newCoin,
                level: newLevel,
            },
        });
        if (newLevel > profile.level) {
            await this.prisma.activity.create({
                data: {
                    familyId: (await this.prisma.familyMember.findFirst({
                        where: { userId },
                    }))?.familyId || 0,
                    userId,
                    type: 'level_up',
                    message: `Level Up! ถึง Level ${newLevel}`,
                },
            });
        }
    }
};
exports.QuestsService = QuestsService;
exports.QuestsService = QuestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestsService);
//# sourceMappingURL=quests.service.js.map