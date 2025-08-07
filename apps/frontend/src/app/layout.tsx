import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Teacher Dashboard',
  description: 'Manage students and schedule',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6 flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
