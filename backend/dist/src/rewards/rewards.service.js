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
exports.RewardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let RewardsService = class RewardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReward(userId, createRewardDto) {
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId },
            include: { family: true },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('User must be in a family to create rewards');
        }
        if (userFamily.role !== 'Parent') {
            throw new common_1.ForbiddenException('Only parents can create rewards');
        }
        const reward = await this.prisma.reward.create({
            data: {
                familyId: userFamily.familyId,
                createdBy: userId,
                title: createRewardDto.title,
                description: createRewardDto.description,
                costCoin: createRewardDto.costCoin,
                stock: createRewardDto.stock || 0,
                expireAt: createRewardDto.expireAt ? new Date(createRewardDto.expireAt) : null,
            },
            include: {
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
                type: 'reward_created',
                message: `สร้าง Reward: ${reward.title} (${reward.costCoin} Coin)`,
                refId: reward.id,
            },
        });
        return reward;
    }
    async getRewards(userId) {
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId },
            include: { family: true },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('User must be in a family to view rewards');
        }
        const rewards = await this.prisma.reward.findMany({
            where: {
                familyId: userFamily.familyId,
                status: 'active',
                OR: [
                    { expireAt: null },
                    { expireAt: { gt: new Date() } },
                ],
            },
            include: {
                creator: {
                    include: {
                        profile: true,
                    },
                },
                redeemLogs: {
                    where: { status: 'approved' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        const rewardsWithStock = rewards.map(reward => {
            const redeemedCount = reward.redeemLogs.length;
            const availableStock = reward.stock > 0 ? reward.stock - redeemedCount : -1;
            return {
                ...reward,
                availableStock,
                canRedeem: availableStock === -1 || availableStock > 0,
            };
        });
        return rewardsWithStock;
    }
    async getReward(rewardId, userId) {
        const reward = await this.prisma.reward.findUnique({
            where: { id: rewardId },
            include: {
                creator: {
                    include: {
                        profile: true,
                    },
                },
                redeemLogs: {
                    include: {
                        user: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });
        if (!reward) {
            throw new common_1.NotFoundException('Reward not found');
        }
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId, familyId: reward.familyId },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('You can only view rewards from your family');
        }
        return reward;
    }
    async redeemReward(rewardId, userId) {
        const reward = await this.getReward(rewardId, userId);
        if (reward.status !== 'active') {
            throw new common_1.BadRequestException('Reward is not available');
        }
        if (reward.expireAt && reward.expireAt < new Date()) {
            throw new common_1.BadRequestException('Reward has expired');
        }
        const userProfile = await this.prisma.profile.findUnique({
            where: { userId },
        });
        if (!userProfile || userProfile.coin < reward.costCoin) {
            throw new common_1.BadRequestException('Insufficient coins');
        }
        if (reward.stock > 0) {
            const redeemedCount = await this.prisma.rewardRedeem.count({
                where: {
                    rewardId,
                    status: 'approved',
                },
            });
            if (redeemedCount >= reward.stock) {
                throw new common_1.BadRequestException('Reward is out of stock');
            }
        }
        const existingRedeem = await this.prisma.rewardRedeem.findFirst({
            where: {
                rewardId,
                userId,
                status: 'pending',
            },
        });
        if (existingRedeem) {
            throw new common_1.BadRequestException('You already have a pending redemption for this reward');
        }
        const redeemLog = await this.prisma.rewardRedeem.create({
            data: {
                rewardId,
                userId,
                familyId: reward.familyId,
                costCoin: reward.costCoin,
            },
            include: {
                user: {
                    include: {
                        profile: true,
                    },
                },
                reward: true,
            },
        });
        await this.prisma.activity.create({
            data: {
                familyId: reward.familyId,
                userId,
                type: 'reward_redeemed',
                message: `ขอแลก Reward: ${reward.title} (${reward.costCoin} Coin)`,
                refId: reward.id,
            },
        });
        return redeemLog;
    }
    async getRedeemRequests(userId) {
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId },
            include: { family: true },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('User must be in a family to view redeem requests');
        }
        if (userFamily.role !== 'Parent') {
            throw new common_1.ForbiddenException('Only parents can view redeem requests');
        }
        const redeemRequests = await this.prisma.rewardRedeem.findMany({
            where: {
                familyId: userFamily.familyId,
                status: 'pending',
            },
            include: {
                user: {
                    include: {
                        profile: true,
                    },
                },
                reward: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return redeemRequests;
    }
    async approveRedeem(redeemId, userId, approved) {
        const redeemLog = await this.prisma.rewardRedeem.findUnique({
            where: { id: redeemId },
            include: {
                user: {
                    include: {
                        profile: true,
                    },
                },
                reward: true,
            },
        });
        if (!redeemLog) {
            throw new common_1.NotFoundException('Redeem request not found');
        }
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId, familyId: redeemLog.familyId },
        });
        if (!userFamily || userFamily.role !== 'Parent') {
            throw new common_1.ForbiddenException('Only parents can approve redeem requests');
        }
        if (redeemLog.status !== 'pending') {
            throw new common_1.BadRequestException('Redeem request is not pending');
        }
        const newStatus = approved ? 'approved' : 'rejected';
        const updatedRedeem = await this.prisma.rewardRedeem.update({
            where: { id: redeemId },
            data: {
                status: newStatus,
                approvedBy: approved ? userId : null,
                approvedAt: approved ? new Date() : null,
            },
            include: {
                user: {
                    include: {
                        profile: true,
                    },
                },
                reward: true,
            },
        });
        if (approved) {
            await this.prisma.profile.update({
                where: { userId: redeemLog.userId },
                data: {
                    coin: {
                        decrement: redeemLog.costCoin,
                    },
                },
            });
            await this.prisma.activity.create({
                data: {
                    familyId: redeemLog.familyId,
                    userId: redeemLog.userId,
                    type: 'reward_approved',
                    message: `ได้รับ Reward: ${redeemLog.reward.title} (ใช้ ${redeemLog.costCoin} Coin)`,
                    refId: redeemLog.rewardId,
                },
            });
        }
        return updatedRedeem;
    }
    async updateReward(rewardId, userId, updateData) {
        const reward = await this.getReward(rewardId, userId);
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId, familyId: reward.familyId },
        });
        if (!userFamily || userFamily.role !== 'Parent') {
            throw new common_1.ForbiddenException('Only parents can update rewards');
        }
        if (reward.createdBy !== userId) {
            throw new common_1.ForbiddenException('You can only update rewards you created');
        }
        const updatedReward = await this.prisma.reward.update({
            where: { id: rewardId },
            data: {
                title: updateData.title,
                description: updateData.description,
                costCoin: updateData.costCoin,
                stock: updateData.stock,
                expireAt: updateData.expireAt ? new Date(updateData.expireAt) : null,
            },
            include: {
                creator: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        return updatedReward;
    }
    async deleteReward(rewardId, userId) {
        const reward = await this.getReward(rewardId, userId);
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId, familyId: reward.familyId },
        });
        if (!userFamily || userFamily.role !== 'Parent') {
            throw new common_1.ForbiddenException('Only parents can delete rewards');
        }
        if (reward.createdBy !== userId) {
            throw new common_1.ForbiddenException('You can only delete rewards you created');
        }
        await this.prisma.reward.update({
            where: { id: rewardId },
            data: { status: 'inactive' },
        });
        return { message: 'Reward deleted successfully' };
    }
};
exports.RewardsService = RewardsService;
exports.RewardsService = RewardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RewardsService);
//# sourceMappingURL=rewards.service.js.map