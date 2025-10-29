import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from '../common/dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../common/dto/auth.dto").AuthResponseDto>;
    login(loginDto: LoginDto): Promise<import("../common/dto/auth.dto").AuthResponseDto>;
    refresh(refreshDto: RefreshTokenDto): Promise<{
        accessToken: string;
    }>;
    getProfile(user: {
        id: number;
    }): {
        id: number;
    };
}
