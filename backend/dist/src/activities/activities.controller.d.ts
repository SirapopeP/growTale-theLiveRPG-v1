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
        userId: number | null;
        type: string;
        message: string;
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
        userId: number | null;
        type: string;
        message: string;
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
        userId: number | null;
        type: string;
        message: string;
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
        userId: number | null;
        type: string;
        message: string;
    }>;
}
