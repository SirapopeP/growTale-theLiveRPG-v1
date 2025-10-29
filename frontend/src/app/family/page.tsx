'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFamily } from '@/hooks/useFamilies';
import { CreateFamilyRequest, JoinFamilyRequest } from '@/types';

export default function FamilyPage() {
  const { user } = useAuth();
  const { family, loading, createFamily, joinFamily } = useFamily();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [createForm, setCreateForm] = useState<CreateFamilyRequest>({
    name: '',
  });
  const [joinForm, setJoinForm] = useState<JoinFamilyRequest>({
    inviteCode: '',
  });

  const handleCreateFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFamily(createForm);
      setShowCreateModal(false);
      setCreateForm({ name: '' });
    } catch (error: any) {
      alert(error.message || 'Failed to create family');
    }
  };

  const handleJoinFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await joinFamily(joinForm);
      setShowJoinModal(false);
      setJoinForm({ inviteCode: '' });
    } catch (error: any) {
      alert(error.message || 'Failed to join family');
    }
  };

  const copyInviteCode = () => {
    if (family?.inviteCode) {
      navigator.clipboard.writeText(family.inviteCode);
      alert('คัดลอก Invite Code แล้ว');
    }
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
          <a className="btn btn-ghost text-xl smooth-transform focus-ring">GrowTale</a>
        </div>
        <div className="flex-none">
          <a href="/dashboard" className="btn btn-ghost smooth-transform focus-ring">กลับไป Dashboard</a>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">จัดการครอบครัว</h1>

        {family ? (
          <div className="space-y-6">
            {/* Family Info */}
            <div className="card bg-base-100 card-elevate interactive">
              <div className="card-body">
                <h2 className="card-title text-2xl">{family.name}</h2>
                <div className="flex items-center gap-4 mt-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Invite Code</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1"
                        value={family.inviteCode}
                        readOnly
                      />
                      <button
                        className="btn btn-primary focus-ring interactive"
                        onClick={copyInviteCode}
                      >
                        คัดลอก
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-base-content/70 mt-2">
                  แชร์ Code นี้ให้สมาชิกครอบครัวเพื่อเข้าร่วม
                </p>
              </div>
            </div>

            {/* Family Members */}
            <div className="card bg-base-100 card-elevate interactive">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">สมาชิกครอบครัว</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {family.members.map((member) => (
                    <div key={member.id} className="card bg-base-200 card-elevate interactive">
                      <div className="card-body p-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-12">
                              <span className="text-xl">
                                {member.user.displayName.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold">{member.user.displayName}</h4>
                            <div className="flex items-center gap-2">
                              <div className={`badge ${
                                member.role === 'Parent' ? 'badge-primary' : 'badge-secondary'
                              }`}>
                                {member.role === 'Parent' ? 'พ่อแม่' : 'ลูก'}
                              </div>
                              {member.user.profile && (
                                <div className="text-sm text-base-content/70">
                                  Level {member.user.profile.level}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-base-content/50 mt-2">
                          เข้าร่วม: {new Date(member.joinedAt).toLocaleDateString('th-TH')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👨‍👩‍👦‍👦</div>
            <h3 className="text-xl font-semibold mb-4">ยังไม่ได้เข้าร่วมครอบครัว</h3>
            <p className="text-base-content/70 mb-6">
              {user?.role === 'Parent' 
                ? 'สร้างครอบครัวใหม่หรือเข้าร่วมครอบครัวที่มีอยู่' 
                : 'ขอ Invite Code จากพ่อแม่เพื่อเข้าร่วมครอบครัว'
              }
            </p>
            <div className="flex gap-4 justify-center">
              {user?.role === 'Parent' && (
                <button
                  className="btn btn-primary focus-ring interactive"
                  onClick={() => setShowCreateModal(true)}
                >
                  สร้างครอบครัวใหม่
                </button>
              )}
              <button
                className="btn btn-secondary focus-ring interactive"
                onClick={() => setShowJoinModal(true)}
              >
                เข้าร่วมครอบครัว
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Family Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">สร้างครอบครัวใหม่</h3>
            <form onSubmit={handleCreateFamily} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ชื่อครอบครัว</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="เช่น ครอบครัวสมบูรณ์"
                  required
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowCreateModal(false)}
                >
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-primary">
                  สร้างครอบครัว
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Family Modal */}
      {showJoinModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">เข้าร่วมครอบครัว</h3>
            <form onSubmit={handleJoinFamily} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Invite Code</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={joinForm.inviteCode}
                  onChange={(e) => setJoinForm({ ...joinForm, inviteCode: e.target.value })}
                  placeholder="กรอก Invite Code ที่ได้รับจากพ่อแม่"
                  required
                />
                <label className="label">
                  <span className="label-text-alt">
                    ขอ Invite Code จากพ่อแม่เพื่อเข้าร่วมครอบครัว
                  </span>
                </label>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowJoinModal(false)}
                >
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-primary">
                  เข้าร่วมครอบครัว
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
