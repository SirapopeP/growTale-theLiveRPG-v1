import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { User } from '@/types';

export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/me');
      setProfile(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (updateData: { displayName?: string; avatarUrl?: string }) => {
    try {
      const response = await api.patch('/users/me', updateData);
      setProfile(response.data);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
};
