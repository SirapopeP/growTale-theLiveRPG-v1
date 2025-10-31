export declare enum UserRole {
    ADMIN = "Admin",
    PARENT = "Parent",
    CHILD = "Child"
}
export declare class RegisterDto {
    email: string;
    password: string;
    displayName: string;
    role: UserRole;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
        email: string;
        displayName: string;
        role: string;
    };
}
