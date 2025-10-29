import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
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
      throw new NotFoundException('User not found');
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

  async updateProfile(userId: number, updateUserDto: UpdateUserDto) {
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

  async getUserProfile(userId: number, requesterId: number) {
    // Check if requester is in the same family as the user
    const requester = await this.prisma.user.findUnique({
      where: { id: requesterId },
      include: {
        familyMembers: true,
      },
    });

    if (!requester) {
      throw new NotFoundException('Requester not found');
    }

    const targetUser = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        familyMembers: true,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    // Check if both users are in the same family
    const requesterFamilyIds = requester.familyMembers.map(fm => fm.familyId);
    const targetUserFamilyIds = targetUser.familyMembers.map(fm => fm.familyId);
    
    const hasCommonFamily = requesterFamilyIds.some(familyId => 
      targetUserFamilyIds.includes(familyId)
    );

    if (!hasCommonFamily) {
      throw new ForbiddenException('You can only view profiles of family members');
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

  async getLevelUpInfo(level: number) {
    const expNeeded = Math.floor(100 * Math.pow(level, 1.5));
    const expForNextLevel = Math.floor(100 * Math.pow(level + 1, 1.5));
    
    return {
      currentLevel: level,
      expNeeded,
      expForNextLevel,
      expToNextLevel: expForNextLevel - expNeeded,
    };
  }
}
