'use client';

import { ReactNode } from 'react';

interface DashboardHeaderProps {
  children: ReactNode;
  onMenuClick?: () => void;
}

export function DashboardHeader({ children, onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6 lg:px-8">
      {/* Menu Button - Mobile Only */}
      <button
        onClick={onMenuClick}
        type="button"
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:hidden"
      >
        <span className="sr-only">Abrir menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Header Content */}
      <div className="flex flex-1 items-center justify-between px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </header>
  );
} 