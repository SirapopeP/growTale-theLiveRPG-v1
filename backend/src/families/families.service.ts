import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { JoinFamilyDto } from './dto/join-family.dto';

@Injectable()
export class FamiliesService {
  constructor(private prisma: PrismaService) {}

  async createFamily(userId: number, createFamilyDto: CreateFamilyDto) {
    const { name } = createFamilyDto;

    // Check if user is already in a family
    const existingMembership = await this.prisma.familyMember.findFirst({
      where: { userId },
    });

    if (existingMembership) {
      throw new ConflictException('User is already a member of a family');
    }

    // Generate unique invite code
    const inviteCode = await this.generateUniqueInviteCode();

    // Create family and add user as Parent
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

  async joinFamily(userId: number, joinFamilyDto: JoinFamilyDto) {
    const { inviteCode } = joinFamilyDto;

    // Check if user is already in a family
    const existingMembership = await this.prisma.familyMember.findFirst({
      where: { userId },
    });

    if (existingMembership) {
      throw new ConflictException('User is already a member of a family');
    }

    // Find family by invite code
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
      throw new NotFoundException('Invalid invite code');
    }

    if (family.status !== 'active') {
      throw new ForbiddenException('Family is not active');
    }

    // Add user as Child to family
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

  async getFamily(familyId: number, userId: number) {
    // Check if user is member of this family
    const membership = await this.prisma.familyMember.findFirst({
      where: {
        familyId,
        userId,
      },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this family');
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
      throw new NotFoundException('Family not found');
    }

    return family;
  }

  async getFamilyMembers(familyId: number, userId: number) {
    // Check if user is member of this family
    const membership = await this.prisma.familyMember.findFirst({
      where: {
        familyId,
        userId,
      },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this family');
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

  async getUserFamily(userId: number) {
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

  private async generateUniqueInviteCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let inviteCode: string = '';
    let isUnique = false;

    while (!isUnique) {
      inviteCode = '';
      for (let i = 0; i < 8; i++) {
        inviteCode += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
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
}
