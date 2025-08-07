'use client';

import Link from 'next/link';
import { BookOpen, Users, Calendar, FileText, Folder, MessageSquare, ClipboardList } from 'lucide-react';

const Sidebar = () => (
  <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
    <h2 className="text-2xl font-bold mb-6">Teacher Panel</h2>
    <nav className="space-y-4 flex-1">
      <Link href="/dashboard" className="flex items-center gap-3 hover:text-gray-300">
        <BookOpen className="w-5 h-5" />
        <span>Dashboard</span>
      </Link>
      <Link href="/student" className="flex items-center gap-3 hover:text-gray-300">
        <Users className="w-5 h-5" />
        <span>Students</span>
      </Link>
      <Link href="/schedule" className="flex items-center gap-3 hover:text-gray-300">
        <Calendar className="w-5 h-5" />
        <span>Schedule</span>
      </Link>
      <Link href="/materials" className="flex items-center gap-3 hover:text-gray-300">
        <Folder className="w-5 h-5" />
        <span>Materials</span>
      </Link>
      <Link href="/tasks/student" className="flex items-center gap-3 hover:text-gray-300">
        <BookOpen className="w-5 h-5" />
        <span>My Tasks</span>
      </Link>
      <Link href="/tasks/student/history" className="flex items-center gap-3 hover:text-gray-300">
        <ClipboardList className="..." />
        <span>Histórico</span>
      </Link>
      <Link href="/chat" className="flex items-center gap-3 hover:text-gray-300">
        <MessageSquare className="w-5 h-5" />
        <span>Chat</span>
      </Link>
    </nav>
  </aside>
);

export default Sidebar;