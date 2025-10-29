import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async getActivities(userId: number, limit: number = 50, offset: number = 0) {
    // Get user's family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId },
      include: { family: true },
    });

    if (!userFamily) {
      throw new ForbiddenException('User must be in a family to view activities');
    }

    const activities = await this.prisma.activity.findMany({
      where: {
        familyId: userFamily.familyId,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return activities;
  }

  async getActivity(activityId: number, userId: number) {
    const activity = await this.prisma.activity.findUnique({
      where: { id: activityId },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    // Check if user is in the same family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId, familyId: activity.familyId },
    });

    if (!userFamily) {
      throw new ForbiddenException('You can only view activities from your family');
    }

    return activity;
  }

  async getActivitiesByType(userId: number, type: string, limit: number = 50) {
    // Get user's family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId },
      include: { family: true },
    });

    if (!userFamily) {
      throw new ForbiddenException('User must be in a family to view activities');
    }

    const activities = await this.prisma.activity.findMany({
      where: {
        familyId: userFamily.familyId,
        type,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return activities;
  }

  async getRecentActivities(userId: number, hours: number = 24) {
    // Get user's family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId },
      include: { family: true },
    });

    if (!userFamily) {
      throw new ForbiddenException('User must be in a family to view activities');
    }

    const since = new Date();
    since.setHours(since.getHours() - hours);

    const activities = await this.prisma.activity.findMany({
      where: {
        familyId: userFamily.familyId,
        createdAt: {
          gte: since,
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return activities;
  }

  async getActivityStats(userId: number) {
    // Get user's family
    const userFamily = await this.prisma.familyMember.findFirst({
      where: { userId },
      include: { family: true },
    });

    if (!userFamily) {
      throw new ForbiddenException('User must be in a family to view activity stats');
    }

    const stats = await this.prisma.activity.groupBy({
      by: ['type'],
      where: {
        familyId: userFamily.familyId,
      },
      _count: {
        type: true,
      },
    });

    const totalActivities = await this.prisma.activity.count({
      where: {
        familyId: userFamily.familyId,
      },
    });

    return {
      totalActivities,
      byType: stats,
    };
  }
}
