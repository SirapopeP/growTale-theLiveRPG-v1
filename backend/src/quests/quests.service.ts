import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { SubmitQuestDto } from './dto/submit-quest.dto';

@Injectable()
export class QuestsService {
  constructor(private prisma: PrismaService) {}

  async createQuest(userId: number, createQuestDto: CreateQuestDto) {
    // Get user's family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId },
      include: { family: true },
    });

    if (!userFamily) {
      throw new ForbiddenException('User must be in a family to create quests');
    }

    // Check if user is Parent
    if (userFamily.role !== 'Parent') {
      throw new ForbiddenException('Only parents can create quests');
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

    // Create activity log
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

  async getQuests(userId: number, status?: string, assignedTo?: number) {
    // Get user's family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId },
      include: { family: true },
    });

    if (!userFamily) {
      throw new ForbiddenException('User must be in a family to view quests');
    }

    const where: any = {
      familyId: userFamily.familyId,
    };

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

  async getQuest(questId: number, userId: number) {
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
      throw new NotFoundException('Quest not found');
    }

    // Check if user is in the same family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId, familyId: quest.familyId },
    });

    if (!userFamily) {
      throw new ForbiddenException('You can only view quests from your family');
    }

    return quest;
  }

  async startQuest(questId: number, userId: number) {
    const quest = await this.getQuest(questId, userId);

    if (quest.assignedTo !== userId) {
      throw new ForbiddenException('You can only start quests assigned to you');
    }

    if (quest.status !== 'pending') {
      throw new BadRequestException('Quest is not in pending status');
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

    // Create quest log
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

  async submitQuest(questId: number, userId: number, submitQuestDto: SubmitQuestDto) {
    const quest = await this.getQuest(questId, userId);

    if (quest.assignedTo !== userId) {
      throw new ForbiddenException('You can only submit quests assigned to you');
    }

    if (quest.status !== 'in_progress') {
      throw new BadRequestException('Quest is not in progress');
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

    // Create quest log
    await this.prisma.questLog.create({
      data: {
        questId,
        userId,
        action: 'submitted',
        note: submitQuestDto.note,
        evidenceUrl: submitQuestDto.evidenceUrl,
      },
    });

    // Create activity log
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

  async verifyQuest(questId: number, userId: number, approved: boolean) {
    const quest = await this.getQuest(questId, userId);

    // Check if user is Parent
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId, familyId: quest.familyId },
    });

    if (!userFamily || userFamily.role !== 'Parent') {
      throw new ForbiddenException('Only parents can verify quests');
    }

    if (quest.status !== 'submitted') {
      throw new BadRequestException('Quest is not in submitted status');
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

    // Create quest log
    await this.prisma.questLog.create({
      data: {
        questId,
        userId,
        action: approved ? 'verified' : 'rejected',
        note: approved ? 'Quest ผ่านการอนุมัติ' : 'Quest ถูกปฏิเสธ',
      },
    });

    // If approved, update user profile
    if (approved && quest.assignee) {
      await this.updateUserProfile(quest.assignee.id, quest.rewardExp, quest.rewardCoin);

      // Create activity log
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

  async deleteQuest(questId: number, userId: number) {
    const quest = await this.getQuest(questId, userId);

    // Check if user is Parent and creator
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId, familyId: quest.familyId },
    });

    if (!userFamily || userFamily.role !== 'Parent') {
      throw new ForbiddenException('Only parents can delete quests');
    }

    if (quest.createdBy !== userId) {
      throw new ForbiddenException('You can only delete quests you created');
    }

    await this.prisma.quest.delete({
      where: { id: questId },
    });

    return { message: 'Quest deleted successfully' };
  }

  private async updateUserProfile(userId: number, exp: number, coin: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return;
    }

    const newExp = profile.exp + exp;
    const newCoin = profile.coin + coin;
    
    // Calculate new level
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

    // If level up, create activity
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
}
