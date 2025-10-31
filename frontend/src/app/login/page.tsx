'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login({ identifier: email, password });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100svh-64px)] w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
      <div className="w-[420px] bg-base-100 shadow-xl rounded-2xl border border-base-300">
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="text-sm text-base-content">Welcome to</div>
            <div className="mt-1 flex items-center justify-center gap-1 select-none">
              <span className="text-[34px] leading-none font-semibold tracking-wide text-base-content">Grow</span>
              {/* Wrap tale to anchor the leaf absolutely */}
              <span className="relative inline-block text-[34px] leading-none font-semibold tracking-wide text-gt-primary">
                tale
                <img
                  src="/assets/DLeaf.svg"
                  alt="leaf"
                  className="absolute -top-2 -right-6 h-5 w-7"
                />
              </span>
            </div>
            <div className="mt-2 text-sm font-semibold tracking-wide text-base-content">THE LIVE RPG</div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-error/10 text-error px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email or Tel"
                className="w-full input input-bordered rounded-lg focus:outline-none focus:border-primary px-4 py-3 text-base-content placeholder-base-content/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full input input-bordered rounded-lg focus:outline-none focus:border-primary px-4 py-3 text-base-content placeholder-base-content/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full rounded-lg btn-gt-primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="my-4 flex items-center gap-4">
            <span className="flex-1 h-px bg-base-300" />
            <span className="text-xs text-base-content">or</span>
            <span className="flex-1 h-px bg-base-300" />
          </div>

          <Link
            href="/register"
            className="w-full rounded-lg btn-gt-secondary"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
