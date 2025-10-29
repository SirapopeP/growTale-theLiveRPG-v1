'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socketRef: React.MutableRefObject<Socket | null>;
  connected: boolean;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
}

type NotificationType =
  | 'quest:created'
  | 'quest:submitted'
  | 'quest:verified'
  | 'reward:redeemed'
  | 'reward:approved'
  | 'level:up'
  | 'activity:new'
  | 'notification';

interface QuestEventData {
  questId?: number;
  [key: string]: unknown;
}

interface RewardEventData {
  rewardId?: number;
  [key: string]: unknown;
}

interface LevelUpData {
  level?: number;
  [key: string]: unknown;
}

interface ActivityEventData {
  activityId?: number;
  [key: string]: unknown;
}

type GenericData = Record<string, unknown>;

type NotificationDataByType = {
  'quest:created': QuestEventData;
  'quest:submitted': QuestEventData;
  'quest:verified': QuestEventData;
  'reward:redeemed': RewardEventData;
  'reward:approved': RewardEventData;
  'level:up': LevelUpData;
  'activity:new': ActivityEventData;
  'notification': GenericData;
};

interface Notification<T extends NotificationType = NotificationType> {
  id: string;
  type: T;
  message: string;
  data?: NotificationDataByType[T];
  timestamp: string;
  read: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev].slice(0, 50)); // Keep only last 50 notifications
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3003', {
          auth: {
            token,
          },
        });

        newSocket.on('connect', () => {
          console.log('Connected to WebSocket');
          setConnected(true);
        });

        newSocket.on('disconnect', () => {
          console.log('Disconnected from WebSocket');
          setConnected(false);
        });

        newSocket.on('connected', (data) => {
          console.log('Socket connected:', data);
        });

        // Quest events
        newSocket.on('quest:created', (data) => {
          addNotification({
            id: `quest-created-${Date.now()}`,
            type: 'quest:created',
            message: data.message,
            data: data.data as QuestEventData,
            timestamp: new Date().toISOString(),
            read: false,
          });
        });

        newSocket.on('quest:submitted', (data) => {
          addNotification({
            id: `quest-submitted-${Date.now()}`,
            type: 'quest:submitted',
            message: data.message,
            data: data.data as QuestEventData,
            timestamp: new Date().toISOString(),
            read: false,
          });
        });

        newSocket.on('quest:verified', (data) => {
          addNotification({
            id: `quest-verified-${Date.now()}`,
            type: 'quest:verified',
            message: data.message,
            data: data.data as QuestEventData,
            timestamp: new Date().toISOString(),
            read: false,
          });
        });

        // Reward events
        newSocket.on('reward:redeemed', (data) => {
          addNotification({
            id: `reward-redeemed-${Date.now()}`,
            type: 'reward:redeemed',
            message: data.message,
            data: data.data as RewardEventData,
            timestamp: new Date().toISOString(),
            read: false,
          });
        });

        newSocket.on('reward:approved', (data) => {
          addNotification({
            id: `reward-approved-${Date.now()}`,
            type: 'reward:approved',
            message: data.message,
            data: data.data as RewardEventData,
            timestamp: new Date().toISOString(),
            read: false,
          });
        });

        // Level up event
        newSocket.on('level:up', (data) => {
          addNotification({
            id: `level-up-${Date.now()}`,
            type: 'level:up',
            message: data.message,
            data: data.data as LevelUpData,
            timestamp: new Date().toISOString(),
            read: false,
          });
        });

        // Activity events
        newSocket.on('activity:new', (data) => {
          addNotification({
            id: `activity-${Date.now()}`,
            type: 'activity:new',
            message: data.message,
            data: data.data as ActivityEventData,
            timestamp: new Date().toISOString(),
            read: false,
          });
        });

        // Generic notifications
        newSocket.on('notification', (data) => {
          addNotification({
            id: `notification-${Date.now()}`,
            type: data.type,
            message: data.message,
            data: data.data as GenericData,
            timestamp: data.timestamp,
            read: false,
          });
        });

        socketRef.current = newSocket;

        return () => {
          newSocket.close();
        };
      }
    } else {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [user]);

  const value: SocketContextType = {
    socketRef,
    connected,
    notifications,
    addNotification,
    clearNotifications,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
