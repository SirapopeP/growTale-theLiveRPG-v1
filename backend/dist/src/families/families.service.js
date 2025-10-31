"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamiliesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let FamiliesService = class FamiliesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createFamily(userId, createFamilyDto) {
        const { name } = createFamilyDto;
        const existingMembership = await this.prisma.familyMember.findFirst({
            where: { userId },
        });
        if (existingMembership) {
            throw new common_1.ConflictException('User is already a member of a family');
        }
        const inviteCode = await this.generateUniqueInviteCode();
        const family = await this.prisma.family.create({
            data: {
                name,
                inviteCode,
                members: {
                    create: {
                        userId,
                        role: 'Parent',
                    },
                },
            },
            include: {
                members: {
                    include: {
                        user: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });
        return family;
    }
    async joinFamily(userId, joinFamilyDto) {
        const { inviteCode } = joinFamilyDto;
        const existingMembership = await this.prisma.familyMember.findFirst({
            where: { userId },
        });
        if (existingMembership) {
            throw new common_1.ConflictException('User is already a member of a family');
        }
        const family = await this.prisma.family.findUnique({
            where: { inviteCode },
            include: {
                members: {
                    include: {
                        user: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });
        if (!family) {
            throw new common_1.NotFoundException('Invalid invite code');
        }
        if (family.status !== 'active') {
            throw new common_1.ForbiddenException('Family is not active');
        }
        const updatedFamily = await this.prisma.family.update({
            where: { id: family.id },
            data: {
                members: {
                    create: {
                        userId,
                        role: 'Child',
                    },
                },
            },
            include: {
                members: {
                    include: {
                        user: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });
        return updatedFamily;
    }
    async getFamily(familyId, userId) {
        const membership = await this.prisma.familyMember.findFirst({
            where: {
                familyId,
                userId,
            },
        });
        if (!membership) {
            throw new common_1.ForbiddenException('You are not a member of this family');
        }
        const family = await this.prisma.family.findUnique({
            where: { id: familyId },
            include: {
                members: {
                    include: {
                        user: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });
        if (!family) {
            throw new common_1.NotFoundException('Family not found');
        }
        return family;
    }
    async getFamilyMembers(familyId, userId) {
        const membership = await this.prisma.familyMember.findFirst({
            where: {
                familyId,
                userId,
            },
        });
        if (!membership) {
            throw new common_1.ForbiddenException('You are not a member of this family');
        }
        const members = await this.prisma.familyMember.findMany({
            where: { familyId },
            include: {
                user: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        return members;
    }
    async getUserFamily(userId) {
        const membership = await this.prisma.familyMember.findFirst({
            where: { userId },
            include: {
                family: {
                    include: {
                        members: {
                            include: {
                                user: {
                                    include: {
                                        profile: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!membership) {
            return null;
        }
        return membership.family;
    }
    async searchFamilies(query) {
        const families = await this.prisma.family.findMany({
            where: {
                name: { contains: query, mode: 'insensitive' },
            },
            include: {
                _count: { select: { members: true } },
            },
            take: 20,
        });
        return families.map((f) => ({ id: f.id, name: f.name, members: f._count.members }));
    }
    async joinById(userId, familyId) {
        const existingMembership = await this.prisma.familyMember.findFirst({
            where: { userId },
        });
        if (existingMembership) {
            throw new common_1.ConflictException('User is already a member of a family');
        }
        return this.prisma.familyMember.create({
            data: {
                familyId,
                userId,
                role: 'Parent',
            },
        });
    }
    async generateUniqueInviteCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let inviteCode = '';
        let isUnique = false;
        while (!isUnique) {
            inviteCode = '';
            for (let i = 0; i < 8; i++) {
                inviteCode += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            const existing = await this.prisma.family.findUnique({
                where: { inviteCode },
            });
            if (!existing) {
                isUnique = true;
            }
        }
        return inviteCode;
    }
};
exports.FamiliesService = FamiliesService;
exports.FamiliesService = FamiliesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FamiliesService);
//# sourceMappingURL=families.service.js.map