'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    emailOrTel: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [identifierType, setIdentifierType] = useState<'email' | 'phone'>('email');
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [families, setFamilies] = useState<Array<{ id: number; name: string; members: number }>>([]);
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);

  const handleBack = () => {
    if (step === 1) {
      router.push('/login');
    } else {
      setStep(1);
    }
  };
  
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
      const res = await api.post('/auth/check-identifier', { value: formData.emailOrTel.trim() });
      if (res.data?.exists) {
        setIdentifierType(res.data.type);
        setShowUpdateDialog(true);
        setLoading(false);
        return;
      }
      setStep(2);
    } catch (err: any) {
      setStep(2);
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
    <div className="min-h-[100svh] flex items-center justify-center bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
      <div className="w-[420px] card-gt p-6 relative">
        <div className="card-body">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Back"
            className="absolute left-4 top-4 text-base-content/70 hover:text-base-content text-xl"
          >
            ←
          </button>
          <div className="text-center mb-4">
            <div className="h2-gt">Register Growtale</div>
            <div className="text-sm text-base-content/70">Step {step} of 2</div>
            <div className="mt-2 flex justify-center"><img src="/assets/DLeaf.svg" className="h-6" alt="leaf"/></div>
          </div>
          
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-base-content">Email or Tel</label>
                <input
                  type="text"
                  name="emailOrTel"
                  autoComplete="off"
                  className="w-full input-gt"
                  value={formData.emailOrTel}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-base-content">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  autoComplete="off"
                  className="w-full input-gt"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-base-content">Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  className="w-full input-gt"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-base-content">Confirm-Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  className="w-full input-gt"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>
              <button type="submit" className={`w-full btn-gt-primary ${loading ? 'loading' : ''}`}>Next</button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Toggle Create Family */}
              <button className="w-full btn-gt-primary" onClick={() => { setShowCreate((v)=>!v); setShowJoin(false); }}>
                {showCreate ? 'Hide Create' : 'Create Family'}
              </button>

              {showCreate && (
                <div className="space-y-3">
                  <label className="block text-sm text-base-content">Family Name</label>
                  <input className="input-gt" value={familyName} onChange={(e)=>setFamilyName(e.target.value)} />
                  <button
                    className="w-full btn-gt-primary"
                    onClick={async ()=>{
                      const payload: any = { displayName: formData.displayName, password: formData.password, role: 'Parent' };
                      if (formData.emailOrTel.includes('@')) payload.email = formData.emailOrTel.trim(); else payload.phone = formData.emailOrTel.trim();
                      try {
                        await register(payload);
                        await api.post('/families', { name: familyName });
                        router.push('/dashboard');
                      } catch(err:any){ setError(err.response?.data?.message || 'ดำเนินการไม่สำเร็จ'); }
                    }}
                    disabled={!familyName.trim()}
                  >
                    Done
                  </button>
                </div>
              )}

              <div className="divider-gt"><span className="text-xs text-base-content/70">or</span></div>

              {/* Toggle Join Family */}
              <button className="w-full btn-gt-secondary" onClick={async ()=>{
                setShowJoin((v)=>!v); setShowCreate(false);
                if (!showJoin) {
                  const res = await api.get('/families/search');
                  setFamilies(res.data || []);
                }
              }}>
                {showJoin ? 'Hide Join' : 'Join Family'}
              </button>

              {showJoin && (
                <div className="space-y-3">
                  <div className="border border-base-300 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-base-200">
                        <tr>
                          <th className="text-left p-2">Family Name</th>
                          <th className="text-right p-2">Member</th>
                        </tr>
                      </thead>
                      <tbody>
                        {families.map((f)=> (
                          <tr key={f.id} className={`cursor-pointer hover:bg-base-200 ${selectedFamilyId===f.id?'bg-base-200':''}`} onClick={()=>setSelectedFamilyId(f.id)}>
                            <td className="p-2 text-gt-primary">{f.name}</td>
                            <td className="p-2 text-right">{f.members}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    className="w-full btn-gt-secondary"
                    onClick={async ()=>{
                      const payload: any = { displayName: formData.displayName, password: formData.password, role: 'Parent' };
                      if (formData.emailOrTel.includes('@')) payload.email = formData.emailOrTel.trim(); else payload.phone = formData.emailOrTel.trim();
                      try {
                        await register(payload);
                        if (selectedFamilyId) await api.post('/families/join-by-id', { familyId: selectedFamilyId });
                        router.push('/dashboard');
                      } catch(err:any){ setError(err.response?.data?.message || 'ดำเนินการไม่สำเร็จ'); }
                    }}
                    disabled={!selectedFamilyId}
                  >
                    Join Family
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="my-4 flex items-center gap-4">
            <span className="flex-1 h-px bg-base-300" />
            <span className="text-xs text-base-content">or</span>
            <span className="flex-1 h-px bg-base-300" />
          </div>
          <div className="text-center"><Link href="/login" className="link-gt">เข้าสู่ระบบ</Link></div>

          {showUpdateDialog && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
              <div className="card-gt p-6 w-[360px]">
                <div className="h3-gt mb-2">{identifierType === 'email' ? 'อีเมลถูกใช้แล้ว' : 'เบอร์โทรถูกใช้แล้ว'}</div>
                <p className="text-sm mb-4">กรุณาแก้ไข{identifierType === 'email' ? 'อีเมล' : 'เบอร์โทร'} หรือใช้ข้อมูลอื่น</p>
                <input
                  type="text"
                  name="emailOrTel"
                  className="w-full input-gt mb-3"
                  value={formData.emailOrTel}
                  onChange={handleChange}
                />
                <div className="flex gap-2">
                  <button className="btn-gt-secondary flex-1" onClick={() => setShowUpdateDialog(false)}>ยกเลิก</button>
                  <button className="btn-gt-primary flex-1" onClick={() => setShowUpdateDialog(false)}>อัปเดต</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
