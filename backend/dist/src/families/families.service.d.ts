import { PrismaService } from '../prisma.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { JoinFamilyDto } from './dto/join-family.dto';
export declare class FamiliesService {
    private prisma;
    constructor(prisma: PrismaService);
    createFamily(userId: number, createFamilyDto: CreateFamilyDto): Promise<{
        members: ({
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
            role: string;
            id: number;
            familyId: number;
            userId: number;
            joinedAt: Date;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: string;
        name: string;
        inviteCode: string;
    }>;
    joinFamily(userId: number, joinFamilyDto: JoinFamilyDto): Promise<{
        members: ({
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
            role: string;
            id: number;
            familyId: number;
            userId: number;
            joinedAt: Date;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: string;
        name: string;
        inviteCode: string;
    }>;
    getFamily(familyId: number, userId: number): Promise<{
        members: ({
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
            role: string;
            id: number;
            familyId: number;
            userId: number;
            joinedAt: Date;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: string;
        name: string;
        inviteCode: string;
    }>;
    getFamilyMembers(familyId: number, userId: number): Promise<({
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
        role: string;
        id: number;
        familyId: number;
        userId: number;
        joinedAt: Date;
    })[]>;
    getUserFamily(userId: number): Promise<({
        members: ({
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
            role: string;
            id: number;
            familyId: number;
            userId: number;
            joinedAt: Date;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: string;
        name: string;
        inviteCode: string;
    }) | null>;
    private generateUniqueInviteCode;
}
