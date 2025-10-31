import { IsEmail, IsString, MinLength, IsEnum, ValidateIf } from 'class-validator';
import { UserRole } from '../enums';

export class RegisterDto {
  // Accept either email or phone (at least one)
  @ValidateIf((o) => !!o.email)
  @IsEmail()
  email?: string;

  @ValidateIf((o) => !!o.phone)
  @IsString()
  phone?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  displayName: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class LoginDto {
  @IsString()
  identifier: string; // email or phone

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
    email?: string;
    phone?: string;
    displayName: string;
    role: string;
  };
}
