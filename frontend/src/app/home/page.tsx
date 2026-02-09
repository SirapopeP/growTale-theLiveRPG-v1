'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomeParentPage() {
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
    if (user.role === 'Child') {
      router.replace('/home/child');
      return;
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'Parent') {
    return (
      <div className="min-h-[calc(100svh-56px)] flex items-center justify-center bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
        <span className="loading loading-spinner loading-lg text-gt-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100svh-56px)] bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-base-content">หน้าแรก · ผู้ปกครอง</h1>
          <p className="text-base-content/70 mt-1">สวัสดี {user.displayName} — จัดการภารกิจและรางวัลของครอบครัว</p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <Link
            href="/quests"
            className="card-gt p-6 text-center hover:shadow-elev-2 smooth-transform block"
          >
            <div className="text-3xl mb-2">📋</div>
            <h2 className="text-lg font-semibold text-base-content">ภารกิจ</h2>
            <p className="text-sm text-base-content/70 mt-1">สร้างและติดตาม Quest ให้ลูก</p>
          </Link>
          <Link
            href="/rewards"
            className="card-gt p-6 text-center hover:shadow-elev-2 smooth-transform block"
          >
            <div className="text-3xl mb-2">🎁</div>
            <h2 className="text-lg font-semibold text-base-content">รางวัล</h2>
            <p className="text-sm text-base-content/70 mt-1">ตั้งรางวัลให้ลูกแลกด้วย Coin</p>
          </Link>
          <Link
            href="/family"
            className="card-gt p-6 text-center hover:shadow-elev-2 smooth-transform block"
          >
            <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
            <h2 className="text-lg font-semibold text-base-content">ครอบครัว</h2>
            <p className="text-sm text-base-content/70 mt-1">จัดการสมาชิกและกิจกรรม</p>
          </Link>
        </div>

        <div className="card-gt p-6">
          <h2 className="text-lg font-semibold text-base-content mb-4">Mockup · Home Parent</h2>
          <p className="text-base-content/70 text-sm">
            หน้านี้เป็น mockup สำหรับหน้าหลักผู้ปกครอง จะเชื่อมกับ Quest, Rewards และ Family จริงในขั้นตอนถัดไป
          </p>
        </div>
      </div>
    </div>
  );
}
