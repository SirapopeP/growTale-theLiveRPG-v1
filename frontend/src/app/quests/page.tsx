'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuests } from '@/hooks/useQuests';
import { useFamily } from '@/hooks/useFamilies';
import { CreateQuestRequest } from '@/types';

export default function QuestsPage() {
  const { user } = useAuth();
  const { family } = useFamily();
  const { quests, loading, createQuest, verifyQuest, deleteQuest } = useQuests();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState<CreateQuestRequest>({
    title: '',
    description: '',
    category: 'บ้าน',
    rewardExp: 10,
    rewardCoin: 5,
    assignedTo: undefined,
  });

  const handleCreateQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createQuest(createForm);
      setShowCreateModal(false);
      setCreateForm({
        title: '',
        description: '',
        category: 'บ้าน',
        rewardExp: 10,
        rewardCoin: 5,
        assignedTo: undefined,
      });
    } catch (error) {
      console.error('Failed to create quest:', error);
    }
  };

  const handleVerifyQuest = async (questId: number, approved: boolean) => {
    try {
      await verifyQuest(questId, approved);
    } catch (error) {
      console.error('Failed to verify quest:', error);
    }
  };

  const handleDeleteQuest = async (questId: number) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบ Quest นี้?')) {
      try {
        await deleteQuest(questId);
      } catch (error) {
        console.error('Failed to delete quest:', error);
      }
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {user?.role === 'Parent' ? 'จัดการ Quest' : 'Quest ของฉัน'}
          </h1>
          {user?.role === 'Parent' && (
            <button
              className="btn btn-primary focus-ring interactive"
              onClick={() => setShowCreateModal(true)}
            >
              สร้าง Quest ใหม่
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <div key={quest.id} className="card bg-base-100 card-elevate interactive">
              <div className="card-body">
                <h2 className="card-title">{quest.title}</h2>
                {quest.description && (
                  <p className="text-sm text-base-content/70">{quest.description}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="badge badge-primary">{quest.category}</div>
                  <div className="badge badge-secondary">
                    {quest.status === 'pending' && 'รอเริ่ม'}
                    {quest.status === 'in_progress' && 'กำลังทำ'}
                    {quest.status === 'submitted' && 'ส่งแล้ว'}
                    {quest.status === 'completed' && 'เสร็จสิ้น'}
                    {quest.status === 'expired' && 'หมดเวลา'}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm">
                    <div>EXP: {quest.rewardExp}</div>
                    <div>Coin: {quest.rewardCoin}</div>
                  </div>
                  {quest.dueDate && (
                    <div className="text-xs text-base-content/70">
                      กำหนดส่ง: {new Date(quest.dueDate).toLocaleDateString('th-TH')}
                    </div>
                  )}
                </div>

                {quest.assignee && (
                  <div className="text-sm text-base-content/70">
                    ผู้รับ: {quest.assignee.displayName}
                  </div>
                )}

                {user?.role === 'Parent' && (
                  <div className="card-actions justify-end mt-4">
                    {quest.status === 'submitted' && (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-success btn-sm focus-ring interactive"
                          onClick={() => handleVerifyQuest(quest.id, true)}
                        >
                          อนุมัติ
                        </button>
                        <button
                          className="btn btn-error btn-sm focus-ring interactive"
                          onClick={() => handleVerifyQuest(quest.id, false)}
                        >
                          ปฏิเสธ
                        </button>
                      </div>
                    )}
                    <button
                      className="btn btn-error btn-sm focus-ring interactive"
                      onClick={() => handleDeleteQuest(quest.id)}
                    >
                      ลบ
                    </button>
                  </div>
                )}

                {user?.role === 'Child' && quest.assignee?.id === user.id && (
                  <div className="card-actions justify-end mt-4">
                    {quest.status === 'pending' && (
                      <button className="btn btn-primary btn-sm focus-ring interactive">
                        เริ่มทำ
                      </button>
                    )}
                    {quest.status === 'in_progress' && (
                      <button className="btn btn-secondary btn-sm focus-ring interactive">
                        ส่ง Quest
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {quests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">ยังไม่มี Quest</h3>
            <p className="text-base-content/70">
              {user?.role === 'Parent' 
                ? 'เริ่มสร้าง Quest แรกของคุณ' 
                : 'รอรับ Quest จากพ่อแม่'
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Quest Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">สร้าง Quest ใหม่</h3>
            <form onSubmit={handleCreateQuest} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ชื่อ Quest</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">คำอธิบาย</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">หมวดหมู่</span>
                </label>
                <select
                  className="select select-bordered"
                  value={createForm.category}
                  onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                >
                  <option value="บ้าน">บ้าน</option>
                  <option value="เรียน">เรียน</option>
                  <option value="สุขภาพ">สุขภาพ</option>
                  <option value="พฤติกรรม">พฤติกรรม</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">EXP</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={createForm.rewardExp}
                    onChange={(e) => setCreateForm({ ...createForm, rewardExp: parseInt(e.target.value) })}
                    min="0"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Coin</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={createForm.rewardCoin}
                    onChange={(e) => setCreateForm({ ...createForm, rewardCoin: parseInt(e.target.value) })}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">กำหนดส่ง</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={createForm.dueDate}
                  onChange={(e) => setCreateForm({ ...createForm, dueDate: e.target.value })}
                />
              </div>

              {family?.members && family.members.length > 1 && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">มอบหมายให้</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={createForm.assignedTo || ''}
                    onChange={(e) => setCreateForm({ 
                      ...createForm, 
                      assignedTo: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                  >
                    <option value="">เลือกสมาชิก</option>
                    {family.members
                      .filter(member => member.role === 'Child')
                      .map(member => (
                        <option key={member.id} value={member.user.id}>
                          {member.user.displayName}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowCreateModal(false)}
                >
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-primary">
                  สร้าง Quest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
