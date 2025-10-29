import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto, LoginDto, AuthResponseDto } from '../common/dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    private generateTokens;
    validateUser(userId: number): Promise<{
        id: number;
        email: string;
        displayName: string;
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
    } | null>;
}
