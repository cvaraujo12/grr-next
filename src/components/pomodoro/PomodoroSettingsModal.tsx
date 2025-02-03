'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { usePomodoro } from '@/contexts/pomodoro-context';

interface PomodoroSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PomodoroSettingsModal({ isOpen, onClose }: PomodoroSettingsModalProps) {
  const { settings, updateSettings } = usePomodoro();
  const [formData, setFormData] = useState({
    workDuration: Math.floor(settings.workDuration / 60),
    shortBreakDuration: Math.floor(settings.shortBreakDuration / 60),
    longBreakDuration: Math.floor(settings.longBreakDuration / 60),
    longBreakInterval: settings.longBreakInterval,
  });

  useEffect(() => {
    setFormData({
      workDuration: Math.floor(settings.workDuration / 60),
      shortBreakDuration: Math.floor(settings.shortBreakDuration / 60),
      longBreakDuration: Math.floor(settings.longBreakDuration / 60),
      longBreakInterval: settings.longBreakInterval,
    });
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      workDuration: formData.workDuration * 60,
      shortBreakDuration: formData.shortBreakDuration * 60,
      longBreakDuration: formData.longBreakDuration * 60,
      longBreakInterval: formData.longBreakInterval,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Configurações do Pomodoro
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duração do Foco (minutos)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={formData.workDuration}
              onChange={(e) =>
                setFormData({ ...formData, workDuration: parseInt(e.target.value) || 1 })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duração da Pausa Curta (minutos)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={formData.shortBreakDuration}
              onChange={(e) =>
                setFormData({ ...formData, shortBreakDuration: parseInt(e.target.value) || 1 })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duração da Pausa Longa (minutos)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={formData.longBreakDuration}
              onChange={(e) =>
                setFormData({ ...formData, longBreakDuration: parseInt(e.target.value) || 1 })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pomodoros até Pausa Longa
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.longBreakInterval}
              onChange={(e) =>
                setFormData({ ...formData, longBreakInterval: parseInt(e.target.value) || 1 })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 
                       hover:bg-primary-600 rounded-md transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}