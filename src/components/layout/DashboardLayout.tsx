'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Bell,
  Sun,
  Moon,
  Computer,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const menuItems = [
  { href: '/dashboard', icon: Computer, label: 'Início' },
  { href: '/dashboard/goals', icon: Computer, label: 'Metas' },
  { href: '/dashboard/pomodoro', icon: Computer, label: 'Pomodoro' },
  { href: '/dashboard/notes', icon: Computer, label: 'Notas' },
  { href: '/dashboard/calendar', icon: Computer, label: 'Calendário' },
  { href: '/dashboard/settings', icon: Computer, label: 'Configurações' },
  { href: '/dashboard/help', icon: Computer, label: 'Ajuda' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Desktop */}
      <aside className="fixed hidden md:flex flex-col w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">GRR</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = item.href === '/dashboard';
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/10 dark:text-primary-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle and Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={handleThemeChange}
            className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span>Modo Escuro</span>
              </>
            )}
          </button>
          <Link
            href="/auth/logout"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <Computer className="w-5 h-5" />
            <span>Sair</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="fixed md:hidden w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="flex items-center justify-between p-4">
          {/* Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Logo */}
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">GRR</h1>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeChange}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            {theme === 'dark' ? (
              <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Computer className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="flex-1 bg-transparent outline-none text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity md:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <aside
          className={`fixed top-0 bottom-0 left-0 w-64 bg-white dark:bg-gray-800 transition-transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">GRR</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Computer className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = item.href === '/dashboard';
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/10 dark:text-primary-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Theme Toggle and Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <button
              onClick={handleThemeChange}
              className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Modo Escuro</span>
                </>
              )}
            </button>
            <Link
              href="/auth/logout"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <Computer className="w-5 h-5" />
              <span>Sair</span>
            </Link>
          </div>
        </aside>
      </div>

      {/* Desktop Header */}
      <header className="fixed hidden md:block left-64 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg w-96">
            <Computer className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="flex-1 bg-transparent outline-none text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeChange}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Usuário</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">usuario@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="md:ml-64 pt-28 md:pt-20">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}