import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { JoinFamilyDto } from './dto/join-family.dto';
export declare class FamiliesController {
    private familiesService;
    constructor(familiesService: FamiliesService);
    private getUserId;
    createFamily(user: {
        id: number;
    }, createFamilyDto: CreateFamilyDto): Promise<{
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
                email: string | null;
                phone: string | null;
                passwordHash: string;
                displayName: string;
                avatarUrl: string | null;
                createdAt: Date;
                status: string;
                id: number;
            };
        } & {
            id: number;
            role: import("@prisma/client").$Enums.FamilyRole;
            familyId: number;
            userId: number;
            joinedAt: Date;
        })[];
    } & {
        createdAt: Date;
        status: string;
        id: number;
        name: string;
        inviteCode: string;
    }>;
    joinFamily(user: {
        id: number;
    }, joinFamilyDto: JoinFamilyDto): Promise<{
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
                email: string | null;
                phone: string | null;
                passwordHash: string;
                displayName: string;
                avatarUrl: string | null;
                createdAt: Date;
                status: string;
                id: number;
            };
        } & {
            id: number;
            role: import("@prisma/client").$Enums.FamilyRole;
            familyId: number;
            userId: number;
            joinedAt: Date;
        })[];
    } & {
        createdAt: Date;
        status: string;
        id: number;
        name: string;
        inviteCode: string;
    }>;
    getMyFamily(user: {
        id: number;
    }): Promise<({
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
                email: string | null;
                phone: string | null;
                passwordHash: string;
                displayName: string;
                avatarUrl: string | null;
                createdAt: Date;
                status: string;
                id: number;
            };
        } & {
            id: number;
            role: import("@prisma/client").$Enums.FamilyRole;
            familyId: number;
            userId: number;
            joinedAt: Date;
        })[];
    } & {
        createdAt: Date;
        status: string;
        id: number;
        name: string;
        inviteCode: string;
    }) | null>;
    searchFamilies(q: string): Promise<{
        id: number;
        name: string;
        members: any;
    }[]>;
    getFamily(familyId: number, user: {
        id: number;
    }): Promise<{
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
                email: string | null;
                phone: string | null;
                passwordHash: string;
                displayName: string;
                avatarUrl: string | null;
                createdAt: Date;
                status: string;
                id: number;
            };
        } & {
            id: number;
            role: import("@prisma/client").$Enums.FamilyRole;
            familyId: number;
            userId: number;
            joinedAt: Date;
        })[];
    } & {
        createdAt: Date;
        status: string;
        id: number;
        name: string;
        inviteCode: string;
    }>;
    getFamilyMembers(familyId: number, user: {
        id: number;
    }): Promise<({
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
            email: string | null;
            phone: string | null;
            passwordHash: string;
            displayName: string;
            avatarUrl: string | null;
            createdAt: Date;
            status: string;
            id: number;
        };
    } & {
        id: number;
        role: import("@prisma/client").$Enums.FamilyRole;
        familyId: number;
        userId: number;
        joinedAt: Date;
    })[]>;
    joinById(user: {
        id: number;
    }, familyId: number): Promise<{
        id: number;
        role: import("@prisma/client").$Enums.FamilyRole;
        familyId: number;
        userId: number;
        joinedAt: Date;
    }>;
}
