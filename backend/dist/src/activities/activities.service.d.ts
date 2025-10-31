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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
        }) | null;
    } & {
        createdAt: Date;
        id: number;
        familyId: number;
        refId: number | null;
        type: string;
        userId: number | null;
        message: string;
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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
        }) | null;
    } & {
        createdAt: Date;
        id: number;
        familyId: number;
        refId: number | null;
        type: string;
        userId: number | null;
        message: string;
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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
        }) | null;
    } & {
        createdAt: Date;
        id: number;
        familyId: number;
        refId: number | null;
        type: string;
        userId: number | null;
        message: string;
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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
        }) | null;
    } & {
        createdAt: Date;
        id: number;
        familyId: number;
        refId: number | null;
        type: string;
        userId: number | null;
        message: string;
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
