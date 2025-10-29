'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">GrowTale</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image 
                  alt="Avatar" 
                  src={user.avatarUrl || '/placeholder-avatar.svg'} 
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li><a onClick={() => {
                logout();
                router.push('/login');
              }}>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="hero bg-base-100 rounded-lg shadow-lg mb-6">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">สวัสดี {user.displayName}!</h1>
              <p className="py-6">
                ยินดีต้อนรับสู่ GrowTale - โลก RPG ของครอบครัว
              </p>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Level</div>
                  <div className="stat-value text-primary">{user.profile?.level || 1}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">EXP</div>
                  <div className="stat-value text-secondary">{user.profile?.exp || 0}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Coin</div>
                  <div className="stat-value text-accent">{user.profile?.coin || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.role === 'Parent' ? (
            <>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">จัดการ Quest</h2>
                  <p>สร้างและจัดการภารกิจสำหรับลูก</p>
                <div className="card-actions justify-end">
                  <a href="/quests" className="btn btn-primary">ไปที่ Quest</a>
                </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">ร้านค้า Rewards</h2>
                  <p>ตั้งค่ารางวัลและของรางวัล</p>
                <div className="card-actions justify-end">
                  <a href="/rewards" className="btn btn-primary">จัดการ Rewards</a>
                </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">จัดการครอบครัว</h2>
                  <p>เชิญสมาชิกครอบครัวเข้าร่วม</p>
                <div className="card-actions justify-end">
                  <a href="/family" className="btn btn-primary">จัดการครอบครัว</a>
                </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Quest ของฉัน</h2>
                  <p>ดูและทำภารกิจที่ได้รับมอบหมาย</p>
                <div className="card-actions justify-end">
                  <a href="/quests" className="btn btn-primary">ดู Quest</a>
                </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">ร้านค้า</h2>
                  <p>แลก Coin เป็นรางวัล</p>
                <div className="card-actions justify-end">
                  <a href="/rewards" className="btn btn-primary">ไปที่ร้านค้า</a>
                </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Profile</h2>
                  <p>ดูสถิติและความคืบหน้า</p>
                <div className="card-actions justify-end">
                  <a href="/profile" className="btn btn-primary">ดู Profile</a>
                </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
