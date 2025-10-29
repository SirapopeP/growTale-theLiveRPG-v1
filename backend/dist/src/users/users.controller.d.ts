import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(user: any): Promise<{
        id: number;
        email: string;
        displayName: string;
        avatarUrl: string | null;
        role: string;
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
            id: number;
            createdAt: Date;
            status: string;
            name: string;
            inviteCode: string;
        };
    }>;
    updateProfile(user: any, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        displayName: string;
        avatarUrl: string | null;
        role: string;
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
            id: number;
            createdAt: Date;
            status: string;
            name: string;
            inviteCode: string;
        };
    }>;
    getUserProfile(userId: number, requester: any): Promise<{
        id: number;
        displayName: string;
        avatarUrl: string | null;
        role: string;
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
