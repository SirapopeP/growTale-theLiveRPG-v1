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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ActivitiesService = class ActivitiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getActivities(userId, limit = 50, offset = 0) {
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId },
            include: { family: true },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('User must be in a family to view activities');
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
    async getActivity(activityId, userId) {
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
            throw new common_1.NotFoundException('Activity not found');
        }
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId, familyId: activity.familyId },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('You can only view activities from your family');
        }
        return activity;
    }
    async getActivitiesByType(userId, type, limit = 50) {
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId },
            include: { family: true },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('User must be in a family to view activities');
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
    async getRecentActivities(userId, hours = 24) {
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId },
            include: { family: true },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('User must be in a family to view activities');
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
    async getActivityStats(userId) {
        const userFamily = await this.prisma.familyMember.findFirst({
            where: { userId },
            include: { family: true },
        });
        if (!userFamily) {
            throw new common_1.ForbiddenException('User must be in a family to view activity stats');
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
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActivitiesService);
//# sourceMappingURL=activities.service.js.map