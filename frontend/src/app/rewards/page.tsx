'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRewards, useRedeemRequests } from '@/hooks/useRewards';
import { CreateRewardRequest } from '@/types';

export default function RewardsPage() {
  const { user } = useAuth();
  const { rewards, loading, createReward, redeemReward, deleteReward } = useRewards();
  const { redeemRequests, loading: requestsLoading, approveRedeem } = useRedeemRequests();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [createForm, setCreateForm] = useState<CreateRewardRequest>({
    title: '',
    description: '',
    costCoin: 10,
    stock: 0,
    expireAt: '',
  });

  const handleCreateReward = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReward(createForm);
      setShowCreateModal(false);
      setCreateForm({
        title: '',
        description: '',
        costCoin: 10,
        stock: 0,
        expireAt: '',
      });
    } catch (error) {
      console.error('Failed to create reward:', error);
    }
  };

  const handleRedeemReward = async (rewardId: number) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะแลก Reward นี้?')) {
      try {
        await redeemReward(rewardId);
        alert('ส่งคำขอแลก Reward แล้ว รอการอนุมัติจากพ่อแม่');
      } catch (error: any) {
        alert(error.message || 'Failed to redeem reward');
      }
    }
  };

  const handleApproveRedeem = async (redeemId: number, approved: boolean) => {
    try {
      await approveRedeem(redeemId, approved);
    } catch (error) {
      console.error('Failed to approve redeem:', error);
    }
  };

  const handleDeleteReward = async (rewardId: number) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบ Reward นี้?')) {
      try {
        await deleteReward(rewardId);
      } catch (error) {
        console.error('Failed to delete reward:', error);
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
          <a className="btn btn-ghost text-xl">GrowTale</a>
        </div>
        <div className="flex-none">
          <a href="/dashboard" className="btn btn-ghost">กลับไป Dashboard</a>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {user?.role === 'Parent' ? 'จัดการ Rewards' : 'ร้านค้า'}
          </h1>
          {user?.role === 'Parent' && (
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                สร้าง Reward ใหม่
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowRequestsModal(true)}
              >
                คำขอแลก ({redeemRequests.length})
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <div key={reward.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{reward.title}</h2>
                {reward.description && (
                  <p className="text-sm text-base-content/70">{reward.description}</p>
                )}
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="badge badge-accent">💰 {reward.costCoin} Coin</div>
                  {reward.stock > 0 && (
                    <div className="badge badge-info">
                      เหลือ {reward.availableStock} ชิ้น
                    </div>
                  )}
                  {reward.expireAt && (
                    <div className="badge badge-warning">
                      หมดอายุ: {new Date(reward.expireAt).toLocaleDateString('th-TH')}
                    </div>
                  )}
                </div>

                <div className="card-actions justify-end mt-4">
                  {user?.role === 'Child' ? (
                    <button
                      className={`btn btn-primary btn-sm ${!reward.canRedeem ? 'btn-disabled' : ''}`}
                      onClick={() => handleRedeemReward(reward.id)}
                      disabled={!reward.canRedeem}
                    >
                      แลก
                    </button>
                  ) : (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteReward(reward.id)}
                    >
                      ลบ
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {rewards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold mb-2">ยังไม่มี Reward</h3>
            <p className="text-base-content/70">
              {user?.role === 'Parent' 
                ? 'เริ่มสร้าง Reward แรกของคุณ' 
                : 'รอพ่อแม่สร้าง Reward'
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Reward Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">สร้าง Reward ใหม่</h3>
            <form onSubmit={handleCreateReward} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ชื่อ Reward</span>
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
                  <span className="label-text">ราคา (Coin)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={createForm.costCoin}
                  onChange={(e) => setCreateForm({ ...createForm, costCoin: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">จำนวน (0 = ไม่จำกัด)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={createForm.stock}
                  onChange={(e) => setCreateForm({ ...createForm, stock: parseInt(e.target.value) })}
                  min="0"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">หมดอายุ</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={createForm.expireAt}
                  onChange={(e) => setCreateForm({ ...createForm, expireAt: e.target.value })}
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
                  สร้าง Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Redeem Requests Modal */}
      {showRequestsModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg mb-4">คำขอแลก Reward</h3>
            
            {requestsLoading ? (
              <div className="loading loading-spinner loading-lg"></div>
            ) : (
              <div className="space-y-4">
                {redeemRequests.map((request) => (
                  <div key={request.id} className="card bg-base-100 shadow">
                    <div className="card-body">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{request.reward.title}</h4>
                          <p className="text-sm text-base-content/70">
                            ขอโดย: {request.user.displayName}
                          </p>
                          <p className="text-sm text-base-content/70">
                            ราคา: {request.costCoin} Coin
                          </p>
                          <p className="text-xs text-base-content/50">
                            {new Date(request.createdAt).toLocaleString('th-TH')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleApproveRedeem(request.id, true)}
                          >
                            อนุมัติ
                          </button>
                          <button
                            className="btn btn-error btn-sm"
                            onClick={() => handleApproveRedeem(request.id, false)}
                          >
                            ปฏิเสธ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {redeemRequests.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-base-content/70">ไม่มีคำขอแลก Reward</p>
                  </div>
                )}
              </div>
            )}

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowRequestsModal(false)}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
