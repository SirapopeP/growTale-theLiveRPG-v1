'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function TopNav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="container mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 select-none">
          <span className="text-2xl font-semibold text-base-content">Grow</span>
          <span className="text-2xl font-semibold text-gt-primary">tale</span>
          <Image src="/assets/DLeaf.svg" alt="leaf" width={22} height={18} className="translate-y-[2px]" />
        </Link>

        <nav className="ml-6 hidden md:flex items-center gap-6 text-base-content/80">
          <Link href="/dashboard" className="hover:text-base-content">Home</Link>
          <Link href="/quests" className="hover:text-base-content">Quests</Link>
          <Link href="/rewards" className="hover:text-base-content">Rewards</Link>
          <Link href="/family" className="hover:text-base-content">Family</Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-base-content/80">
            <span className="hover:text-base-content cursor-pointer">EN</span>
            <span>|</span>
            <span className="hover:text-base-content cursor-pointer">TH</span>
          </div>
          {user ? (
            <button
              className="btn-gt-secondary px-4 py-2 rounded-lg"
              onClick={() => { logout(); router.push('/login'); }}
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="btn-gt-secondary px-4 py-2 rounded-lg">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}


