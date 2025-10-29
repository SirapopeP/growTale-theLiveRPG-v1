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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                familyMembers: {
                    include: {
                        family: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const familyMember = user.familyMembers[0];
        const role = familyMember?.role || 'Child';
        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            role,
            profile: user.profile,
            family: familyMember?.family,
        };
    }
    async updateProfile(userId, updateUserDto) {
        const { displayName, avatarUrl } = updateUserDto;
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                displayName,
                avatarUrl,
            },
            include: {
                profile: true,
                familyMembers: {
                    include: {
                        family: true,
                    },
                },
            },
        });
        const familyMember = user.familyMembers[0];
        const role = familyMember?.role || 'Child';
        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            role,
            profile: user.profile,
            family: familyMember?.family,
        };
    }
    async getUserProfile(userId, requesterId) {
        const requester = await this.prisma.user.findUnique({
            where: { id: requesterId },
            include: {
                familyMembers: true,
            },
        });
        if (!requester) {
            throw new common_1.NotFoundException('Requester not found');
        }
        const targetUser = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                familyMembers: true,
            },
        });
        if (!targetUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const requesterFamilyIds = requester.familyMembers.map(fm => fm.familyId);
        const targetUserFamilyIds = targetUser.familyMembers.map(fm => fm.familyId);
        const hasCommonFamily = requesterFamilyIds.some(familyId => targetUserFamilyIds.includes(familyId));
        if (!hasCommonFamily) {
            throw new common_1.ForbiddenException('You can only view profiles of family members');
        }
        const familyMember = targetUser.familyMembers[0];
        const role = familyMember?.role || 'Child';
        return {
            id: targetUser.id,
            displayName: targetUser.displayName,
            avatarUrl: targetUser.avatarUrl,
            role,
            profile: targetUser.profile,
        };
    }
    async getLevelUpInfo(level) {
        const expNeeded = Math.floor(100 * Math.pow(level, 1.5));
        const expForNextLevel = Math.floor(100 * Math.pow(level + 1, 1.5));
        return {
            currentLevel: level,
            expNeeded,
            expForNextLevel,
            expToNextLevel: expForNextLevel - expNeeded,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map