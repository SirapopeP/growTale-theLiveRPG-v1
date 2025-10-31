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
    const { email, phone, password, displayName } = registerDto;
    // force Parent role for this registration flow
    const role: UserRole = 'Parent' as UserRole;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          email ? { email } : undefined,
          phone ? { phone } : undefined,
        ].filter(Boolean) as any,
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user with profile and userRole
    const user = await this.prisma.user.create({
      data: {
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
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
        userRole: {
          create: {
            role: role as any, // Map UserRole enum to Prisma Role enum
          },
        },
      },
      include: {
        profile: true,
        userRole: true,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email ?? user.phone ?? '', role);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email ?? undefined,
        phone: user.phone ?? undefined,
        displayName: user.displayName,
        role,
      },
    };
  }
  async checkIdentifier(value: string) {
    if (!value) {
      return { exists: false };
    }
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: value }, { phone: value }],
      },
      select: { id: true, email: true, phone: true },
    });
    return { exists: !!existing, type: value.includes('@') ? 'email' : 'phone' };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { identifier, password } = loginDto;

    // Find user with userRole
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
        ],
      },
      include: {
        profile: true,
        userRole: true,
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

    // Get user role from userRole table (not from family membership)
    const role: UserRole = (user.userRole?.role || 'Parent') as UserRole; // Default to Parent if no role set

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email ?? user.phone ?? '', role);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email ?? undefined,
        phone: user.phone ?? undefined,
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
          userRole: true,
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

      // Get role from userRole table
      const role = user.userRole?.role || 'Parent';

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
        userRole: true,
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

    // Get role from userRole table
    const role = user.userRole?.role || 'Parent';
    const familyMember = user.familyMembers[0];

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
