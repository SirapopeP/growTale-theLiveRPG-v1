'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { DashboardStats } from '@/types';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (user.role !== 'Admin') {
      router.replace(user.role === 'Child' ? '/home/child' : '/home');
      return;
    }
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get<DashboardStats>('/dashboard/stats');
        setStats(data);
      } catch (err: unknown) {
        const msg =
          err && typeof err === 'object' && 'response' in err
            ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
            : err instanceof Error
              ? err.message
              : null;
        setError(msg || 'โหลดข้อมูลไม่สำเร็จ');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user, authLoading, router]);

  if (authLoading || (user && user.role === 'Admin' && loading && !stats)) {
    return (
      <div className="min-h-[calc(100svh-56px)] flex items-center justify-center bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
        <span className="loading loading-spinner loading-lg text-gt-primary" />
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="min-h-[calc(100svh-56px)] flex items-center justify-center bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
        <div className="card-gt p-6 max-w-md text-center">
          <p className="text-error">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-[calc(100svh-56px)] bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-base-content">ภาพรวมระบบ (Admin)</h1>
          <p className="text-base-content/70 mt-1">สถิติและข้อมูลรวมของโปรเจกต์ GrowTale</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card-gt p-5">
            <div className="text-sm text-base-content/70">ผู้ใช้ทั้งหมด</div>
            <div className="text-2xl font-bold text-gt-primary mt-1">{stats.users.total}</div>
            <div className="mt-2 text-xs text-base-content/60">
              Admin: {stats.users.admins} · Parent: {stats.users.parents} · Child: {stats.users.children}
            </div>
          </div>
          <div className="card-gt p-5">
            <div className="text-sm text-base-content/70">ครอบครัว</div>
            <div className="text-2xl font-bold text-gt-primary mt-1">{stats.families.total}</div>
          </div>
          <div className="card-gt p-5">
            <div className="text-sm text-base-content/70">ภารกิจ (Quests)</div>
            <div className="text-2xl font-bold text-gt-primary mt-1">{stats.quests.total}</div>
            <div className="mt-2 text-xs text-base-content/60">
              {Object.entries(stats.quests.byStatus).map(([k, v]) => `${k}: ${v}`).join(' · ')}
            </div>
          </div>
          <div className="card-gt p-5">
            <div className="text-sm text-base-content/70">รางวัล (Rewards)</div>
            <div className="text-2xl font-bold text-gt-primary mt-1">{stats.rewards.total}</div>
          </div>
        </div>

        <div className="card-gt p-5">
          <h2 className="text-lg font-semibold text-base-content mb-4">กิจกรรมล่าสุด</h2>
          {stats.recentActivities.length === 0 ? (
            <p className="text-base-content/60 text-sm">ยังไม่มีกิจกรรม</p>
          ) : (
            <ul className="space-y-2">
              {stats.recentActivities.map((a) => (
                <li
                  key={a.id}
                  className="flex flex-wrap items-center gap-2 text-sm py-2 border-b border-base-300 last:border-0"
                >
                  <span className="font-medium text-base-content/80">{a.type}</span>
                  <span className="text-base-content/70">{a.message}</span>
                  {a.familyName && (
                    <span className="text-xs px-2 py-0.5 rounded bg-base-300 text-base-content/70">
                      {a.familyName}
                    </span>
                  )}
                  <span className="text-xs text-base-content/50 ml-auto">
                    {new Date(a.createdAt).toLocaleString('th-TH')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
