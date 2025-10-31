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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: number | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
    }>;
    getQuests(user: any, status?: string, assignedTo?: number): Promise<({
        questLogs: {
            createdAt: Date;
            id: number;
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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: number | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
    })[]>;
    getQuest(questId: number, user: any): Promise<{
        questLogs: {
            createdAt: Date;
            id: number;
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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: number | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: number | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: number | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: number | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
    }>;
    deleteQuest(questId: number, user: any): Promise<{
        message: string;
    }>;
}
