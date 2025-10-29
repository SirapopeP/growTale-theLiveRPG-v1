import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
interface JwtPayload {
    sub: number;
    iat?: number;
    exp?: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<{
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
export {};
