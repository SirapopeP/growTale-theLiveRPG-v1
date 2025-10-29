'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useActivities } from '@/hooks/useActivities';
import Image from 'next/image';

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const { activities } = useActivities(20);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    avatarUrl: user?.avatarUrl || '',
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(editForm);
      setShowEditModal(false);
    } catch (error: any) {
      alert(error.message || 'Failed to update profile');
    }
  };

  const calculateExpProgress = () => {
    if (!profile?.profile) return 0;
    const currentLevel = profile.profile.level;
    const currentExp = profile.profile.exp;
    const expForCurrentLevel = Math.floor(100 * Math.pow(currentLevel, 1.5));
    const expForNextLevel = Math.floor(100 * Math.pow(currentLevel + 1, 1.5));
    const expNeeded = expForNextLevel - expForCurrentLevel;
    const expProgress = currentExp - expForCurrentLevel;
    return Math.min((expProgress / expNeeded) * 100, 100);
  };

  const getStatsData = () => {
    if (!profile?.profile) return [];
    const stats = profile.profile.stats;
    return [
      { name: 'ความแข็งแกร่ง', value: stats.strength, color: 'text-red-500' },
      { name: 'ปัญญา', value: stats.wisdom, color: 'text-blue-500' },
      { name: 'วินัย', value: stats.discipline, color: 'text-green-500' },
      { name: 'ความคิดสร้างสรรค์', value: stats.creativity, color: 'text-purple-500' },
      { name: 'ความใจดี', value: stats.kindness, color: 'text-yellow-500' },
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">GrowTale</a>
        </div>
        <div className="flex-none">
          <a href="/dashboard" className="btn btn-ghost">กลับไป Dashboard</a>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Profile</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowEditModal(true)}
          >
            แก้ไข Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <Image 
                      src={profile?.avatarUrl || '/placeholder-avatar.svg'} 
                      alt="Avatar"
                      width={96}
                      height={96}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <h2 className="card-title justify-center text-2xl">
                  {profile?.displayName}
                </h2>
                <div className="badge badge-primary mb-4">
                  {profile?.role === 'Parent' ? 'พ่อแม่' : 'ลูก'}
                </div>
                
                {/* Level and EXP */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">Level {profile?.profile?.level || 1}</span>
                      <span className="text-sm text-base-content/70">
                        {profile?.profile?.exp || 0} EXP
                      </span>
                    </div>
                    <progress 
                      className="progress progress-primary w-full" 
                      value={calculateExpProgress()} 
                      max="100"
                    ></progress>
                    <div className="text-xs text-base-content/50 mt-1">
                      {Math.round(calculateExpProgress())}% ไปสู่ Level ต่อไป
                    </div>
                  </div>

                  <div className="stats stats-vertical shadow">
                    <div className="stat">
                      <div className="stat-title">Coin</div>
                      <div className="stat-value text-accent">{profile?.profile?.coin || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">สถิติความสามารถ</h3>
                <div className="space-y-4">
                  {getStatsData().map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{stat.name}</span>
                      <div className="flex items-center gap-2">
                        <progress 
                          className="progress progress-primary w-32" 
                          value={stat.value} 
                          max="100"
                        ></progress>
                        <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">กิจกรรมล่าสุด</h3>
                <div className="space-y-3">
                  {activities.slice(0, 10).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-base-200 rounded-lg">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <span className="text-xs">
                            {activity.user?.displayName?.charAt(0) || '?'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-base-content/50">
                          {new Date(activity.createdAt).toLocaleString('th-TH')}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {activities.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-base-content/70">ยังไม่มีกิจกรรม</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">แก้ไข Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ชื่อแสดง</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avatar URL</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered"
                  value={editForm.avatarUrl}
                  onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowEditModal(false)}
                >
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-primary">
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
