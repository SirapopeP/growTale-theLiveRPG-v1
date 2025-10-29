export interface User {
  id: number;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: 'Parent' | 'Child';
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
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
  role: 'Parent' | 'Child';
}
