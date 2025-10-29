import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Activity } from '@/types';

export const useActivities = (limit: number = 50, offset: number = 0) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/activities?limit=${limit}&offset=${offset}`);
      setActivities(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [limit, offset]);

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities,
  };
};

export const useRecentActivities = (hours: number = 24) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentActivities = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/activities/recent?hours=${hours}`);
      setActivities(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch recent activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivities();
  }, [hours]);

  return {
    activities,
    loading,
    error,
    refetch: fetchRecentActivities,
  };
};
