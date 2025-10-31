import { PrismaService } from '../prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';
export declare class RewardsService {
    private prisma;
    constructor(prisma: PrismaService);
    createReward(userId: number, createRewardDto: CreateRewardDto): Promise<{
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
    } & {
        createdAt: Date;
        status: string;
        id: number;
        title: string;
        description: string | null;
        familyId: number;
        createdBy: number;
        costCoin: number;
        stock: number;
        expireAt: Date | null;
    }>;
    getRewards(userId: number): Promise<{
        availableStock: number;
        canRedeem: boolean;
        redeemLogs: {
            createdAt: Date;
            status: string;
            id: number;
            familyId: number;
            costCoin: number;
            userId: number;
            rewardId: number;
            approvedBy: number | null;
            approvedAt: Date | null;
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
        createdAt: Date;
        status: string;
        id: number;
        title: string;
        description: string | null;
        familyId: number;
        createdBy: number;
        costCoin: number;
        stock: number;
        expireAt: Date | null;
    }[]>;
    getReward(rewardId: number, userId: number): Promise<{
        redeemLogs: ({
            user: {
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
        } & {
            createdAt: Date;
            status: string;
            id: number;
            familyId: number;
            costCoin: number;
            userId: number;
            rewardId: number;
            approvedBy: number | null;
            approvedAt: Date | null;
        })[];
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
    } & {
        createdAt: Date;
        status: string;
        id: number;
        title: string;
        description: string | null;
        familyId: number;
        createdBy: number;
        costCoin: number;
        stock: number;
        expireAt: Date | null;
    }>;
    redeemReward(rewardId: number, userId: number): Promise<{
        user: {
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
        reward: {
            createdAt: Date;
            status: string;
            id: number;
            title: string;
            description: string | null;
            familyId: number;
            createdBy: number;
            costCoin: number;
            stock: number;
            expireAt: Date | null;
        };
    } & {
        createdAt: Date;
        status: string;
        id: number;
        familyId: number;
        costCoin: number;
        userId: number;
        rewardId: number;
        approvedBy: number | null;
        approvedAt: Date | null;
    }>;
    getRedeemRequests(userId: number): Promise<({
        user: {
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
        reward: {
            createdAt: Date;
            status: string;
            id: number;
            title: string;
            description: string | null;
            familyId: number;
            createdBy: number;
            costCoin: number;
            stock: number;
            expireAt: Date | null;
        };
    } & {
        createdAt: Date;
        status: string;
        id: number;
        familyId: number;
        costCoin: number;
        userId: number;
        rewardId: number;
        approvedBy: number | null;
        approvedAt: Date | null;
    })[]>;
    approveRedeem(redeemId: number, userId: number, approved: boolean): Promise<{
        user: {
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
        reward: {
            createdAt: Date;
            status: string;
            id: number;
            title: string;
            description: string | null;
            familyId: number;
            createdBy: number;
            costCoin: number;
            stock: number;
            expireAt: Date | null;
        };
    } & {
        createdAt: Date;
        status: string;
        id: number;
        familyId: number;
        costCoin: number;
        userId: number;
        rewardId: number;
        approvedBy: number | null;
        approvedAt: Date | null;
    }>;
    updateReward(rewardId: number, userId: number, updateData: Partial<CreateRewardDto>): Promise<{
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
    } & {
        createdAt: Date;
        status: string;
        id: number;
        title: string;
        description: string | null;
        familyId: number;
        createdBy: number;
        costCoin: number;
        stock: number;
        expireAt: Date | null;
    }>;
    deleteReward(rewardId: number, userId: number): Promise<{
        message: string;
    }>;
}
