import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Reward, RewardRedeem, CreateRewardRequest } from '@/types';

export const useRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const response = await api.get('/rewards');
      setRewards(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch rewards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const createReward = async (rewardData: CreateRewardRequest) => {
    try {
      const response = await api.post('/rewards', rewardData);
      setRewards(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create reward');
    }
  };

  const redeemReward = async (rewardId: number) => {
    try {
      const response = await api.post(`/rewards/${rewardId}/redeem`);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to redeem reward');
    }
  };

  const updateReward = async (rewardId: number, updateData: Partial<CreateRewardRequest>) => {
    try {
      const response = await api.patch(`/rewards/${rewardId}`, updateData);
      setRewards(prev => prev.map(r => r.id === rewardId ? response.data : r));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update reward');
    }
  };

  const deleteReward = async (rewardId: number) => {
    try {
      await api.delete(`/rewards/${rewardId}`);
      setRewards(prev => prev.filter(r => r.id !== rewardId));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete reward');
    }
  };

  return {
    rewards,
    loading,
    error,
    createReward,
    redeemReward,
    updateReward,
    deleteReward,
    refetch: fetchRewards,
  };
};

export const useRedeemRequests = () => {
  const [redeemRequests, setRedeemRequests] = useState<RewardRedeem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRedeemRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/rewards/redeem-requests');
      setRedeemRequests(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch redeem requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedeemRequests();
  }, []);

  const approveRedeem = async (redeemId: number, approved: boolean) => {
    try {
      const response = await api.patch(`/rewards/${redeemId}/approve`, { approved });
      setRedeemRequests(prev => prev.map(r => r.id === redeemId ? response.data : r));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to approve redeem');
    }
  };

  return {
    redeemRequests,
    loading,
    error,
    approveRedeem,
    refetch: fetchRedeemRequests,
  };
};
