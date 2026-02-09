export interface User {
  id: number;
  email?: string;
  displayName: string;
  avatarUrl?: string;
  role: 'Admin' | 'Parent' | 'Child';
  profile?: {
    id: number;
    level: number;
    exp: number;
    coin: number;
    stats: {
      strength: number;
      wisdom: number;
      discipline: number;
      creativity: number;
      kindness: number;
    };
    badges: string[];
  };
  family?: {
    id: number;
    name: string;
    inviteCode: string;
  };
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  email?: string;
  phone?: string;
  password: string;
  displayName: string;
  role: 'Parent' | 'Child';
}
