'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XIcon } from 'lucide-react';
import { PomodoroSettings } from '@/types';

interface PomodoroSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PomodoroSettings;
  onSave: (settings: PomodoroSettings) => void;
}

export function PomodoroSettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: PomodoroSettingsModalProps) {
  const [formData, setFormData] = useState<PomodoroSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-medium">
              Configurações do Pomodoro
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="focusDuration" className="block text-sm font-medium text-neutral-700">
                  Duração do Foco (min)
                </label>
                <input
                  type="number"
                  id="focusDuration"
                  min="1"
                  max="60"
                  value={formData.focusDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, focusDuration: parseInt(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="breakDuration" className="block text-sm font-medium text-neutral-700">
                  Duração da Pausa (min)
                </label>
                <input
                  type="number"
                  id="breakDuration"
                  min="1"
                  max="30"
                  value={formData.breakDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, breakDuration: parseInt(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoStartBreak"
                  checked={formData.autoStartBreak}
                  onChange={(e) => setFormData(prev => ({ ...prev, autoStartBreak: e.target.checked }))}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="autoStartBreak" className="ml-2 block text-sm text-neutral-700">
                  Iniciar pausa automaticamente
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoStartFocus"
                  checked={formData.autoStartFocus}
                  onChange={(e) => setFormData(prev => ({ ...prev, autoStartFocus: e.target.checked }))}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="autoStartFocus" className="ml-2 block text-sm text-neutral-700">
                  Iniciar foco automaticamente
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Salvar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 