import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async createReward(userId: number, createRewardDto: CreateRewardDto) {
    // Get user's family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId },
      include: { family: true },
    });

    if (!userFamily) {
      throw new ForbiddenException('User must be in a family to create rewards');
    }

    // Check if user is Parent
    if (userFamily.role !== 'Parent') {
      throw new ForbiddenException('Only parents can create rewards');
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

    // Create activity log
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

  async getRewards(userId: number) {
    // Get user's family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId },
      include: { family: true },
    });

    if (!userFamily) {
      throw new ForbiddenException('User must be in a family to view rewards');
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

    // Calculate available stock
    const rewardsWithStock = rewards.map(reward => {
      const redeemedCount = reward.redeemLogs.length;
      const availableStock = reward.stock > 0 ? reward.stock - redeemedCount : -1; // -1 means unlimited
      
      return {
        ...reward,
        availableStock,
        canRedeem: availableStock === -1 || availableStock > 0,
      };
    });

    return rewardsWithStock;
  }

  async getReward(rewardId: number, userId: number) {
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
      throw new NotFoundException('Reward not found');
    }

    // Check if user is in the same family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId, familyId: reward.familyId },
    });

    if (!userFamily) {
      throw new ForbiddenException('You can only view rewards from your family');
    }

    return reward;
  }

  async redeemReward(rewardId: number, userId: number) {
    const reward = await this.getReward(rewardId, userId);

    // Check if reward is still available
    if (reward.status !== 'active') {
      throw new BadRequestException('Reward is not available');
    }

    if (reward.expireAt && reward.expireAt < new Date()) {
      throw new BadRequestException('Reward has expired');
    }

    // Check user's coin balance
    const userProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!userProfile || userProfile.coin < reward.costCoin) {
      throw new BadRequestException('Insufficient coins');
    }

    // Check stock availability
    if (reward.stock > 0) {
      const redeemedCount = await this.prisma.rewardRedeem.count({
        where: {
          rewardId,
          status: 'approved',
        },
      });

      if (redeemedCount >= reward.stock) {
        throw new BadRequestException('Reward is out of stock');
      }
    }

    // Check if user already has pending redemption for this reward
    const existingRedeem = await this.prisma.rewardRedeem.findFirst({
      where: {
        rewardId,
        userId,
        status: 'pending',
      },
    });

    if (existingRedeem) {
      throw new BadRequestException('You already have a pending redemption for this reward');
    }

    // Create redemption request
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

    // Create activity log
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

  async getRedeemRequests(userId: number) {
    // Get user's family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId },
      include: { family: true },
    });

    if (!userFamily) {
      throw new ForbiddenException('User must be in a family to view redeem requests');
    }

    // Check if user is Parent
    if (userFamily.role !== 'Parent') {
      throw new ForbiddenException('Only parents can view redeem requests');
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

  async approveRedeem(redeemId: number, userId: number, approved: boolean) {
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
      throw new NotFoundException('Redeem request not found');
    }

    // Check if user is Parent in the same family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId, familyId: redeemLog.familyId },
    });

    if (!userFamily || userFamily.role !== 'Parent') {
      throw new ForbiddenException('Only parents can approve redeem requests');
    }

    if (redeemLog.status !== 'pending') {
      throw new BadRequestException('Redeem request is not pending');
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

    // If approved, deduct coins from user
    if (approved) {
      await this.prisma.profile.update({
        where: { userId: redeemLog.userId },
        data: {
          coin: {
            decrement: redeemLog.costCoin,
          },
        },
      });

      // Create activity log
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

  async updateReward(rewardId: number, userId: number, updateData: Partial<CreateRewardDto>) {
    const reward = await this.getReward(rewardId, userId);

    // Check if user is Parent and creator
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId, familyId: reward.familyId },
    });

    if (!userFamily || userFamily.role !== 'Parent') {
      throw new ForbiddenException('Only parents can update rewards');
    }

    if (reward.createdBy !== userId) {
      throw new ForbiddenException('You can only update rewards you created');
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

  async deleteReward(rewardId: number, userId: number) {
    const reward = await this.getReward(rewardId, userId);

    // Check if user is Parent and creator
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId, familyId: reward.familyId },
    });

    if (!userFamily || userFamily.role !== 'Parent') {
      throw new ForbiddenException('Only parents can delete rewards');
    }

    if (reward.createdBy !== userId) {
      throw new ForbiddenException('You can only delete rewards you created');
    }

    await this.prisma.reward.update({
      where: { id: rewardId },
      data: { status: 'inactive' },
    });

    return { message: 'Reward deleted successfully' };
  }
}
