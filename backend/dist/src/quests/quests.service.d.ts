import { PrismaService } from '../prisma.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { SubmitQuestDto } from './dto/submit-quest.dto';
export declare class QuestsService {
    private prisma;
    constructor(prisma: PrismaService);
    createQuest(userId: number, createQuestDto: CreateQuestDto): Promise<{
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
    }>;
    getQuests(userId: number, status?: string, assignedTo?: number): Promise<({
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
            email: string;
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
    })[]>;
    getQuest(questId: number, userId: number): Promise<{
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
            email: string;
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
    }>;
    startQuest(questId: number, userId: number): Promise<{
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
    }>;
    submitQuest(questId: number, userId: number, submitQuestDto: SubmitQuestDto): Promise<{
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
    }>;
    verifyQuest(questId: number, userId: number, approved: boolean): Promise<{
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
        status: string;
        id: number;
        title: string;
        description: string | null;
        category: string | null;
        rewardExp: number;
        rewardCoin: number;
        dueDate: Date | null;
        familyId: number;
        createdBy: number;
        assignedTo: number | null;
    }>;
    deleteQuest(questId: number, userId: number): Promise<{
        message: string;
    }>;
    private updateUserProfile;
}
