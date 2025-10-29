import { ActivitiesService } from './activities.service';
export declare class ActivitiesController {
    private activitiesService;
    constructor(activitiesService: ActivitiesService);
    getActivities(user: any, limit?: number, offset?: number): Promise<({
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
    getRecentActivities(user: any, hours?: number): Promise<({
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
    getActivityStats(user: any): Promise<{
        totalActivities: number;
        byType: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.ActivityGroupByOutputType, "type"[]> & {
            _count: {
                type: number;
            };
        })[];
    }>;
    getActivitiesByType(type: string, user: any, limit?: number): Promise<({
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
    getActivity(activityId: number, user: any): Promise<{
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
}
