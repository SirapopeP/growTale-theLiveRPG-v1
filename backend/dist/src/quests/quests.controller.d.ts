import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { SubmitQuestDto } from './dto/submit-quest.dto';
export declare class QuestsController {
    private questsService;
    constructor(questsService: QuestsService);
    createQuest(user: any, createQuestDto: CreateQuestDto): Promise<{
        creator: {
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
        };
        assignee: ({
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
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        assignedTo: number | null;
        createdBy: number;
    }>;
    getQuests(user: any, status?: string, assignedTo?: number): Promise<({
        questLogs: {
            id: number;
            createdAt: Date;
            userId: number;
            note: string | null;
            evidenceUrl: string | null;
            action: string;
            questId: number;
        }[];
        creator: {
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
        };
        assignee: ({
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
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        assignedTo: number | null;
        createdBy: number;
    })[]>;
    getQuest(questId: number, user: any): Promise<{
        questLogs: {
            id: number;
            createdAt: Date;
            userId: number;
            note: string | null;
            evidenceUrl: string | null;
            action: string;
            questId: number;
        }[];
        creator: {
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
        };
        assignee: ({
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
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        assignedTo: number | null;
        createdBy: number;
    }>;
    startQuest(questId: number, user: any): Promise<{
        creator: {
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
        };
        assignee: ({
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
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        assignedTo: number | null;
        createdBy: number;
    }>;
    submitQuest(questId: number, user: any, submitQuestDto: SubmitQuestDto): Promise<{
        creator: {
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
        };
        assignee: ({
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
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        assignedTo: number | null;
        createdBy: number;
    }>;
    verifyQuest(questId: number, user: any, approved: boolean): Promise<{
        creator: {
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
        };
        assignee: ({
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
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        assignedTo: number | null;
        createdBy: number;
    }>;
    deleteQuest(questId: number, user: any): Promise<{
        message: string;
    }>;
}
