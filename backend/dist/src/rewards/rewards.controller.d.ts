import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
export declare class RewardsController {
    private rewardsService;
    constructor(rewardsService: RewardsService);
    createReward(user: any, createRewardDto: CreateRewardDto): Promise<{
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
    } & {
        id: number;
        createdAt: Date;
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        createdBy: number;
        costCoin: number;
        stock: number;
        expireAt: Date | null;
    }>;
    getRewards(user: any): Promise<{
        availableStock: number;
        canRedeem: boolean;
        redeemLogs: {
            id: number;
            createdAt: Date;
            status: string;
            familyId: number;
            userId: number;
            costCoin: number;
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
            displayName: string;
            id: number;
            passwordHash: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
        };
        id: number;
        createdAt: Date;
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        createdBy: number;
        costCoin: number;
        stock: number;
        expireAt: Date | null;
    }[]>;
    getRedeemRequests(user: any): Promise<({
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
            displayName: string;
            id: number;
            passwordHash: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
        };
        reward: {
            id: number;
            createdAt: Date;
            status: string;
            familyId: number;
            title: string;
            description: string | null;
            createdBy: number;
            costCoin: number;
            stock: number;
            expireAt: Date | null;
        };
    } & {
        id: number;
        createdAt: Date;
        status: string;
        familyId: number;
        userId: number;
        costCoin: number;
        rewardId: number;
        approvedBy: number | null;
        approvedAt: Date | null;
    })[]>;
    getReward(rewardId: number, user: any): Promise<{
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
                displayName: string;
                id: number;
                passwordHash: string;
                avatarUrl: string | null;
                createdAt: Date;
                status: string;
            };
        } & {
            id: number;
            createdAt: Date;
            status: string;
            familyId: number;
            userId: number;
            costCoin: number;
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
            displayName: string;
            id: number;
            passwordHash: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
        };
    } & {
        id: number;
        createdAt: Date;
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        createdBy: number;
        costCoin: number;
        stock: number;
        expireAt: Date | null;
    }>;
    redeemReward(rewardId: number, user: any): Promise<{
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
            displayName: string;
            id: number;
            passwordHash: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
        };
        reward: {
            id: number;
            createdAt: Date;
            status: string;
            familyId: number;
            title: string;
            description: string | null;
            createdBy: number;
            costCoin: number;
            stock: number;
            expireAt: Date | null;
        };
    } & {
        id: number;
        createdAt: Date;
        status: string;
        familyId: number;
        userId: number;
        costCoin: number;
        rewardId: number;
        approvedBy: number | null;
        approvedAt: Date | null;
    }>;
    approveRedeem(redeemId: number, user: any, approved: boolean): Promise<{
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
            displayName: string;
            id: number;
            passwordHash: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
        };
        reward: {
            id: number;
            createdAt: Date;
            status: string;
            familyId: number;
            title: string;
            description: string | null;
            createdBy: number;
            costCoin: number;
            stock: number;
            expireAt: Date | null;
        };
    } & {
        id: number;
        createdAt: Date;
        status: string;
        familyId: number;
        userId: number;
        costCoin: number;
        rewardId: number;
        approvedBy: number | null;
        approvedAt: Date | null;
    }>;
    updateReward(rewardId: number, user: any, updateData: Partial<CreateRewardDto>): Promise<{
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
    } & {
        id: number;
        createdAt: Date;
        status: string;
        familyId: number;
        title: string;
        description: string | null;
        createdBy: number;
        costCoin: number;
        stock: number;
        expireAt: Date | null;
    }>;
    deleteReward(rewardId: number, user: any): Promise<{
        message: string;
    }>;
}
