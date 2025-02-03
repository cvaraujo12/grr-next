'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark' | 'system';

const isValidTheme = (value: unknown): value is Theme => {
  return typeof value === 'string' && ['light', 'dark', 'system'].includes(value as string);
};

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Garante que o tema seja válido
  useEffect(() => {
    if (!isValidTheme(theme)) {
      setTheme('system');
    }
  }, [theme, setTheme]);

  useEffect(() => {
    // Detecta o tema do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    // Define o tema inicial
    updateSystemTheme();

    // Atualiza quando o tema do sistema mudar
    mediaQuery.addEventListener('change', updateSystemTheme);
    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const validTheme = isValidTheme(theme) ? theme : 'system';
    const isDark = validTheme === 'dark' || (validTheme === 'system' && systemTheme === 'dark');

    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
  }, [theme, systemTheme]);

  const setValidTheme = (newTheme: Theme) => {
    if (isValidTheme(newTheme)) {
      setTheme(newTheme);
    } else {
      console.warn(`Invalid theme value: ${newTheme}, defaulting to 'system'`);
      setTheme('system');
    }
  };

  return {
    theme: isValidTheme(theme) ? theme : 'system',
    systemTheme,
    setTheme: setValidTheme,
    isDark: (isValidTheme(theme) ? theme : 'system') === 'dark' || 
           ((isValidTheme(theme) ? theme : 'system') === 'system' && systemTheme === 'dark'),
  };
}
