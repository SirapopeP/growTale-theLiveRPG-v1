import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Family, CreateFamilyRequest, JoinFamilyRequest } from '@/types';

export const useFamily = () => {
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFamily = async () => {
    try {
      setLoading(true);
      const response = await api.get('/families/my-family');
      setFamily(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch family');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamily();
  }, []);

  const createFamily = async (familyData: CreateFamilyRequest) => {
    try {
      const response = await api.post('/families', familyData);
      setFamily(response.data);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create family');
    }
  };

  const joinFamily = async (joinData: JoinFamilyRequest) => {
    try {
      const response = await api.post('/families/join', joinData);
      setFamily(response.data);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to join family');
    }
  };

  return {
    family,
    loading,
    error,
    createFamily,
    joinFamily,
    refetch: fetchFamily,
  };
};
