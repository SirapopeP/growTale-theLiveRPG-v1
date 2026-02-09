'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomeChildPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (user.role === 'Admin') {
      router.replace('/dashboard');
      return;
    }
    if (user.role === 'Parent') {
      router.replace('/home');
      return;
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'Child') {
    return (
      <div className="min-h-[calc(100svh-56px)] flex items-center justify-center bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
        <span className="loading loading-spinner loading-lg text-gt-primary" />
      </div>
    );
  }

  const level = user.profile?.level ?? 1;
  const exp = user.profile?.exp ?? 0;
  const coin = user.profile?.coin ?? 0;

  return (
    <div className="min-h-[calc(100svh-56px)] bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-base-content">หน้าแรก · เด็ก</h1>
          <p className="text-base-content/70 mt-1">สวัสดี {user.displayName} — ทำ Quest รับ Coin แลกรางวัล!</p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-8">
          <div className="card-gt p-5 text-center">
            <div className="text-sm text-base-content/70">Level</div>
            <div className="text-2xl font-bold text-gt-primary">{level}</div>
          </div>
          <div className="card-gt p-5 text-center">
            <div className="text-sm text-base-content/70">EXP</div>
            <div className="text-2xl font-bold text-gt-primary">{exp}</div>
          </div>
          <div className="card-gt p-5 text-center">
            <div className="text-sm text-base-content/70">Coin</div>
            <div className="text-2xl font-bold text-gt-primary">{coin}</div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
          <Link
            href="/quests"
            className="card-gt p-6 text-center hover:shadow-elev-2 smooth-transform block"
          >
            <div className="text-3xl mb-2">⚔️</div>
            <h2 className="text-lg font-semibold text-base-content">ภารกิจของฉัน</h2>
            <p className="text-sm text-base-content/70 mt-1">ดูและทำ Quest เพื่อรับ EXP กับ Coin</p>
          </Link>
          <Link
            href="/rewards"
            className="card-gt p-6 text-center hover:shadow-elev-2 smooth-transform block"
          >
            <div className="text-3xl mb-2">🏆</div>
            <h2 className="text-lg font-semibold text-base-content">ร้านรางวัล</h2>
            <p className="text-sm text-base-content/70 mt-1">แลก Coin กับรางวัล</p>
          </Link>
        </div>

        <div className="card-gt p-6">
          <h2 className="text-lg font-semibold text-base-content mb-4">Mockup · Home Child</h2>
          <p className="text-base-content/70 text-sm">
            หน้านี้เป็น mockup สำหรับหน้าหลักเด็ก จะเชื่อมกับ Quest ที่ถูกมอบหมายและรางวัลที่แลกได้ในขั้นตอนถัดไป
          </p>
        </div>
      </div>
    </div>
  );
}
