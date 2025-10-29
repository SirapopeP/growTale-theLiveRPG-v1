'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 'Child' as 'Parent' | 'Child',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      setLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
        role: formData.role,
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold text-center mb-6">
            สมัครสมาชิก GrowTale
          </h1>
          
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">อีเมล</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">ชื่อแสดง</span>
              </label>
              <input
                type="text"
                name="displayName"
                className="input input-bordered"
                value={formData.displayName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">บทบาท</span>
              </label>
              <select
                name="role"
                className="select select-bordered"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Parent">พ่อแม่ (Parent)</option>
                <option value="Child">ลูก (Child)</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">รหัสผ่าน</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">ยืนยันรหัสผ่าน</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="input input-bordered"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
              </button>
            </div>
          </form>

          <div className="divider">หรือ</div>

          <div className="text-center">
            <Link href="/login" className="link link-primary">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
