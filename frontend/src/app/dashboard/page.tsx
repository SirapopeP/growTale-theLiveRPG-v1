'use client';

import Link from 'next/link';
import { useI18n } from '@/contexts/I18nContext';

function WelcomeCard({ className = '' }: { className?: string }) {
  return (
    <div className={`card-gt p-6 flex flex-col items-center justify-between ${className}`}>
      <div className="text-center space-y-2">
        <div className="text-base-content/70">Welcome to</div>
        <div className="h2-gt">THE LIVE RPG</div>
      </div>
      <button className="btn-gt-primary mt-6">Done !</button>
    </div>
  );
}

export default function DashboardPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-[var(--gt-bg-from)] to-[var(--gt-bg-to)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="h1-gt">{t('home.title')}</div>
          <div className="text-base-content/70">{t('home.subtitle')}</div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <WelcomeCard />
          <WelcomeCard />
          <WelcomeCard />
          <WelcomeCard className="xl:col-span-2" />
          <WelcomeCard className="sm:col-span-2" />
        </div>

        {/* Quick actions */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/quests" className="card-gt p-5 text-center hover:shadow-elev-2 smooth-transform">
            <div className="h3-gt">Quests</div>
            <p className="text-sm text-base-content/70 mt-1">Create and track your family quests</p>
          </Link>
          <Link href="/rewards" className="card-gt p-5 text-center hover:shadow-elev-2 smooth-transform">
            <div className="h3-gt">Rewards</div>
            <p className="text-sm text-base-content/70 mt-1">Redeem rewards with earned coins</p>
          </Link>
          <Link href="/family" className="card-gt p-5 text-center hover:shadow-elev-2 smooth-transform">
            <div className="h3-gt">Family</div>
            <p className="text-sm text-base-content/70 mt-1">Manage members and activities</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
