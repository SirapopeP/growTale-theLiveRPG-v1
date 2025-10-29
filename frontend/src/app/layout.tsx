import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { SocketProvider } from '@/contexts/SocketContext';

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
    <html lang="th" data-theme="growtale">
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>
            {children}
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}