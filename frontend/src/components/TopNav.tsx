'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useI18n } from '@/contexts/I18nContext';

export default function TopNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="w-full bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="container mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 select-none">
          <span className="text-2xl font-semibold text-base-content">Grow</span>
          <span className="text-2xl font-semibold text-gt-primary">tale</span>
          <Image src="/assets/DLeaf.svg" alt="leaf" width={22} height={18} className="translate-y-[2px]" />
        </Link>

        <nav className="ml-6 hidden md:flex items-center gap-6 text-base-content/80">
          <Link href="/dashboard" className="hover:text-base-content">{t('nav.home')}</Link>
          <Link href="/quests" className="hover:text-base-content">{t('nav.quests')}</Link>
          <Link href="/rewards" className="hover:text-base-content">{t('nav.rewards')}</Link>
          <Link href="/family" className="hover:text-base-content">{t('nav.family')}</Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2 text-base-content/80">
            <button
              className={locale==='en' ? 'text-base-content font-semibold' : 'hover:text-base-content'}
              onClick={() => setLocale('en')}
            >EN</button>
            <span>|</span>
            <button
              className={locale==='th' ? 'text-base-content font-semibold' : 'hover:text-base-content'}
              onClick={() => setLocale('th')}
            >TH</button>
          </div>
          {pathname === '/login' ? null : user ? (
            <button
              className="btn-gt-secondary px-4 py-2 rounded-lg"
              onClick={() => { logout(); router.push('/login'); }}
            >
              {t('nav.signout')}
            </button>
          ) : (
            <Link href="/login" className="btn-gt-secondary px-4 py-2 rounded-lg">{t('nav.signin')}</Link>
          )}
        </div>
      </div>
    </header>
  );
}


