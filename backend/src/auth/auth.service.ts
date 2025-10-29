import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  RegisterDto,
  LoginDto,
  AuthResponseDto,
  UserRole,
} from '../common/dto/auth.dto';

interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, displayName, role } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user and profile
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName,
        profile: {
          create: {
            level: 1,
            exp: 0,
            coin: 0,
            stats: {
              strength: 0,
              wisdom: 0,
              discipline: 0,
              creativity: 0,
              kindness: 0,
            },
            badges: [],
          },
        },
      },
      include: {
        profile: true,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, email, role);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
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
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user role from family membership
    const familyMember = user.familyMembers[0];
    const role: UserRole = (familyMember?.role || 'Child') as UserRole; // Default to Child if no family

    // Generate tokens
    const tokens = await this.generateTokens(user.id, email, role);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role,
      },
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          familyMembers: {
            include: {
              family: true,
            },
          },
        },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const familyMember = user.familyMembers[0];
      const role = familyMember?.role || 'Child';

      const accessToken = this.jwtService.sign(
        { sub: user.id, email: user.email, role },
        {
          expiresIn: '15m',
        },
      );

      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(userId: number, email: string, role: UserRole) {
    const payload = { sub: userId, email, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async validateUser(userId: number) {
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
      return null;
    }

    const familyMember = user.familyMembers[0];
    const role = familyMember?.role || 'Child';

    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role,
      profile: user.profile,
      family: familyMember?.family,
    };
  }
}
