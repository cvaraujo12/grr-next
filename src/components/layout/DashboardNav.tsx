'use client';

import Link from 'next/link';
import { Home, Target, Clock } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/goals', label: 'Metas', icon: Target },
  { href: '/dashboard/pomodoro', label: 'Pomodoro', icon: Clock },
];

export function DashboardNav() {
  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <item.icon className="mr-3 h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
