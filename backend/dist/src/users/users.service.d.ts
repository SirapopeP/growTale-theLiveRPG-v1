import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: number): Promise<{
        id: number;
        email: string | null;
        displayName: string;
        avatarUrl: string | null;
        role: import("@prisma/client").$Enums.FamilyRole;
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
        family: {
            createdAt: Date;
            status: string;
            id: number;
            name: string;
            inviteCode: string;
        };
    }>;
    updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string | null;
        displayName: string;
        avatarUrl: string | null;
        role: import("@prisma/client").$Enums.FamilyRole;
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
        family: {
            createdAt: Date;
            status: string;
            id: number;
            name: string;
            inviteCode: string;
        };
    }>;
    getUserProfile(userId: number, requesterId: number): Promise<{
        id: number;
        displayName: string;
        avatarUrl: string | null;
        role: import("@prisma/client").$Enums.FamilyRole;
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
    }>;
    getLevelUpInfo(level: number): Promise<{
        currentLevel: number;
        expNeeded: number;
        expForNextLevel: number;
        expToNextLevel: number;
    }>;
}
