import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface DashboardStats {
  users: { total: number; parents: number; children: number; admins: number };
  families: { total: number };
  quests: { total: number; byStatus: Record<string, number> };
  rewards: { total: number };
  recentActivities: Array<{
    id: number;
    type: string;
    message: string;
    createdAt: string;
    familyName?: string;
  }>;
}

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(): Promise<DashboardStats> {
    const [userCounts, familyCount, questCounts, questByStatus, rewardCount, recentActivities] =
      await Promise.all([
        this.getUserCounts(),
        this.prisma.family.count(),
        this.prisma.quest.count(),
        this.getQuestCountByStatus(),
        this.prisma.reward.count(),
        this.getRecentActivities(10),
      ]);

    return {
      users: userCounts,
      families: { total: familyCount },
      quests: { total: questCounts, byStatus: questByStatus },
      rewards: { total: rewardCount },
      recentActivities,
    };
  }

  private async getUserCounts(): Promise<{
    total: number;
    parents: number;
    children: number;
    admins: number;
  }> {
    const roles = await this.prisma.userRole.groupBy({
      by: ['role'],
      _count: { role: true },
    });
    const total = await this.prisma.user.count();
    const byRole = Object.fromEntries(roles.map((r) => [r.role, r._count.role]));
    return {
      total,
      parents: byRole['Parent'] ?? 0,
      children: byRole['Child'] ?? 0,
      admins: byRole['Admin'] ?? 0,
    };
  }

  private async getQuestCountByStatus(): Promise<Record<string, number>> {
    const rows = await this.prisma.quest.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    return Object.fromEntries(rows.map((r) => [r.status, r._count.status]));
  }

  private async getRecentActivities(limit: number) {
    const list = await this.prisma.activity.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { family: { select: { name: true } } },
    });
    return list.map((a) => ({
      id: a.id,
      type: a.type,
      message: a.message,
      createdAt: a.createdAt.toISOString(),
      familyName: a.family.name,
    }));
  }
}
