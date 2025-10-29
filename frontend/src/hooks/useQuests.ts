import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Quest, CreateQuestRequest, SubmitQuestRequest } from '@/types';

export const useQuests = (status?: string, assignedTo?: number) => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuests = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (assignedTo) params.append('assignedTo', assignedTo.toString());
      
      const response = await api.get(`/quests?${params.toString()}`);
      setQuests(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch quests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, [status, assignedTo]);

  const createQuest = async (questData: CreateQuestRequest) => {
    try {
      const response = await api.post('/quests', questData);
      setQuests(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create quest');
    }
  };

  const startQuest = async (questId: number) => {
    try {
      const response = await api.patch(`/quests/${questId}/start`);
      setQuests(prev => prev.map(q => q.id === questId ? response.data : q));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to start quest');
    }
  };

  const submitQuest = async (questId: number, submitData: SubmitQuestRequest) => {
    try {
      const response = await api.patch(`/quests/${questId}/submit`, submitData);
      setQuests(prev => prev.map(q => q.id === questId ? response.data : q));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to submit quest');
    }
  };

  const verifyQuest = async (questId: number, approved: boolean) => {
    try {
      const response = await api.patch(`/quests/${questId}/verify`, { approved });
      setQuests(prev => prev.map(q => q.id === questId ? response.data : q));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to verify quest');
    }
  };

  const deleteQuest = async (questId: number) => {
    try {
      await api.delete(`/quests/${questId}`);
      setQuests(prev => prev.filter(q => q.id !== questId));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete quest');
    }
  };

  return {
    quests,
    loading,
    error,
    createQuest,
    startQuest,
    submitQuest,
    verifyQuest,
    deleteQuest,
    refetch: fetchQuests,
  };
};

export const useQuest = (questId: number) => {
  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuest = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/quests/${questId}`);
      setQuest(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch quest');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (questId) {
      fetchQuest();
    }
  }, [questId]);

  return {
    quest,
    loading,
    error,
    refetch: fetchQuest,
  };
};
