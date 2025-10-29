import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

export enum UserRole {
  PARENT = 'Parent',
  CHILD = 'Child',
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  displayName: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    displayName: string;
    role: string;
  };
}
