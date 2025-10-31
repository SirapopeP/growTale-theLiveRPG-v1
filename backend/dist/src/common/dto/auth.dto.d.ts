export declare enum UserRole {
    ADMIN = "Admin",
    PARENT = "Parent",
    CHILD = "Child"
}
export declare class RegisterDto {
    email?: string;
    phone?: string;
    password: string;
    displayName: string;
    role: UserRole;
}
export declare class LoginDto {
    identifier: string;
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
        email?: string;
        phone?: string;
        displayName: string;
        role: string;
    };
}
