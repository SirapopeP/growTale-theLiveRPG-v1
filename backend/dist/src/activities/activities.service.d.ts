import { PrismaService } from '../prisma.service';
export declare class ActivitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    getActivities(userId: number, limit?: number, offset?: number): Promise<({
        user: ({
            profile: {
                id: number;
                level: number;
                exp: number;
                coin: number;
                stats: import("@prisma/client/runtime/library").JsonValue;
                badges: import("@prisma/client/runtime/library").JsonValue;
                updatedAt: Date;
                userId: number;
            } | null;
        } & {
            email: string;
            displayName: string;
            id: number;
            passwordHash: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
        }) | null;
    } & {
        id: number;
        createdAt: Date;
        familyId: number;
        userId: number | null;
        type: string;
        message: string;
        refId: number | null;
    })[]>;
    getActivity(activityId: number, userId: number): Promise<{
        user: ({
            profile: {
                id: number;
                level: number;
                exp: number;
                coin: number;
                stats: import("@prisma/client/runtime/library").JsonValue;
                badges: import("@prisma/client/runtime/library").JsonValue;
                updatedAt: Date;
                userId: number;
            } | null;
        } & {
            email: string;
            displayName: string;
            id: number;
            passwordHash: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
        }) | null;
    } & {
        id: number;
        createdAt: Date;
        familyId: number;
        userId: number | null;
        type: string;
        message: string;
        refId: number | null;
    }>;
    getActivitiesByType(userId: number, type: string, limit?: number): Promise<({
        user: ({
            profile: {
                id: number;
                level: number;
                exp: number;
                coin: number;
                stats: import("@prisma/client/runtime/library").JsonValue;
                badges: import("@prisma/client/runtime/library").JsonValue;
                updatedAt: Date;
                userId: number;
            } | null;
        } & {
            email: string;
            displayName: string;
            id: number;
            passwordHash: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
        }) | null;
    } & {
        id: number;
        createdAt: Date;
        familyId: number;
        userId: number | null;
        type: string;
        message: string;
        refId: number | null;
    })[]>;
    getRecentActivities(userId: number, hours?: number): Promise<({
        user: ({
            profile: {
                id: number;
                level: number;
                exp: number;
                coin: number;
                stats: import("@prisma/client/runtime/library").JsonValue;
                badges: import("@prisma/client/runtime/library").JsonValue;
                updatedAt: Date;
                userId: number;
            } | null;
        } & {
            email: string;
            displayName: string;
            id: number;
            passwordHash: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
        }) | null;
    } & {
        id: number;
        createdAt: Date;
        familyId: number;
        userId: number | null;
        type: string;
        message: string;
        refId: number | null;
    })[]>;
    getActivityStats(userId: number): Promise<{
        totalActivities: number;
        byType: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.ActivityGroupByOutputType, "type"[]> & {
            _count: {
                type: number;
            };
        })[];
    }>;
}
