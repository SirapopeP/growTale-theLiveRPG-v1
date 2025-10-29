import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { SocketProvider } from '@/contexts/SocketContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

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
          <AuthProvider>
            <SocketProvider>
              <div className="min-h-dvh flex flex-col">
                <header className="navbar bg-base-100/80 backdrop-blur border-b border-base-300">
                  <div className="flex-1 px-2 text-xl font-semibold">GrowTale</div>
                  <div className="flex-none px-2">
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-1">{children}</main>
              </div>
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}