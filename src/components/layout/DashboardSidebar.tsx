'use client';

import { ReactNode } from 'react';

interface DashboardSidebarProps {
  children: ReactNode;
  isOpen?: boolean;
}

export function DashboardSidebar({ children, isOpen = false }: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 z-40 h-screen w-[280px] -translate-x-full transform bg-white transition-transform dark:bg-gray-800 lg:static lg:translate-x-0">
        <div className="h-full overflow-y-auto border-r border-gray-200 p-4 dark:border-gray-700">
          <nav className="space-y-2">
            {children}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <div className={`fixed inset-0 z-30 bg-gray-900/50 lg:hidden ${isOpen ? 'block' : 'hidden'}`} />
    </>
  );
} 