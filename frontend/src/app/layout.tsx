import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { SocketProvider } from '@/contexts/SocketContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import TopNav from '@/components/TopNav';
import { I18nProvider } from '@/contexts/I18nContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GrowTale - The Live RPG',
  description: 'RPG สำหรับครอบครัว ที่ให้พ่อแม่สร้าง Quest ให้ลูก',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" data-theme="light">
      <body className={inter.className}>
        <ThemeProvider>
          <I18nProvider>
          <AuthProvider>
            <SocketProvider>
              <div className="min-h-dvh flex flex-col">
                <TopNav />
                <main className="flex-1">{children}</main>
              </div>
            </SocketProvider>
          </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}