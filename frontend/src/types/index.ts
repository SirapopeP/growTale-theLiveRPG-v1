export * from './auth';

export interface Quest {
  id: number;
  title: string;
  description?: string;
  category?: string;
  rewardExp: number;
  rewardCoin: number;
  dueDate?: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'completed' | 'expired';
  createdAt: string;
  assignee?: {
    id: number;
    displayName: string;
    profile?: {
      level: number;
      exp: number;
    };
  };
  creator?: {
    id: number;
    displayName: string;
  };
  questLogs?: QuestLog[];
}

export interface QuestLog {
  id: number;
  action: string;
  note?: string;
  evidenceUrl?: string;
  createdAt: string;
  user: {
    id: number;
    displayName: string;
  };
}

export interface Reward {
  id: number;
  title: string;
  description?: string;
  costCoin: number;
  stock: number;
  availableStock: number;
  canRedeem: boolean;
  expireAt?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  creator?: {
    id: number;
    displayName: string;
  };
}

export interface RewardRedeem {
  id: number;
  costCoin: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  user: {
    id: number;
    displayName: string;
    profile?: {
      level: number;
      coin: number;
    };
  };
  reward: Reward;
}

export interface Family {
  id: number;
  name: string;
  inviteCode: string;
  createdAt: string;
  members: FamilyMember[];
}

export interface FamilyMember {
  id: number;
  role: 'Parent' | 'Child';
  joinedAt: string;
  user: {
    id: number;
    displayName: string;
    profile?: {
      level: number;
      exp: number;
      coin: number;
    };
  };
}

export interface Activity {
  id: number;
  type: string;
  message: string;
  refId?: number;
  createdAt: string;
  user?: {
    id: number;
    displayName: string;
    profile?: {
      level: number;
    };
  };
}

export interface CreateQuestRequest {
  title: string;
  description?: string;
  category?: string;
  rewardExp?: number;
  rewardCoin?: number;
  dueDate?: string;
  assignedTo?: number;
}

export interface SubmitQuestRequest {
  note?: string;
  evidenceUrl?: string;
}

export interface CreateRewardRequest {
  title: string;
  description?: string;
  costCoin: number;
  stock?: number;
  expireAt?: string;
}

export interface JoinFamilyRequest {
  inviteCode: string;
}

export interface CreateFamilyRequest {
  name: string;
}

export interface DashboardStats {
  users: { total: number; parents: number; children: number; admins: number };
  families: { total: number };
  quests: { total: number; byStatus: Record<string, number> };
  rewards: { total: number };
  recentActivities: Array<{
    id: number;
    type: string;
    message: string;
    createdAt: string;
    familyName?: string;
  }>;
}
