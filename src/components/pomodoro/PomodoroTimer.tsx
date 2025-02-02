'use client';

import { useState, useEffect, useCallback } from 'react';
import { PomodoroMode, PomodoroSettings, PomodoroState } from '@/types';
import { PlayIcon, PauseIcon, RotateCcwIcon, Settings2Icon } from 'lucide-react';
import { PomodoroSettingsModal } from './PomodoroSettingsModal';

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  breakDuration: 5,
  autoStartBreak: false,
  autoStartFocus: false,
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function PomodoroTimer() {
  const [state, setState] = useState<PomodoroState>({
    mode: 'focus',
    timeLeft: DEFAULT_SETTINGS.focusDuration * 60,
    isRunning: false,
    settings: DEFAULT_SETTINGS,
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleTimer = () => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      timeLeft: prev.mode === 'focus' ? prev.settings.focusDuration * 60 : prev.settings.breakDuration * 60,
      isRunning: false,
    }));
  }, []);

  const switchMode = useCallback(() => {
    const newMode: PomodoroMode = state.mode === 'focus' ? 'break' : 'focus';
    const newDuration = newMode === 'focus' ? state.settings.focusDuration : state.settings.breakDuration;
    
    setState(prev => ({
      ...prev,
      mode: newMode,
      timeLeft: newDuration * 60,
      isRunning: (newMode === 'break' && prev.settings.autoStartBreak) || 
                 (newMode === 'focus' && prev.settings.autoStartFocus),
    }));

    // Tocar som de notificação
    const audio = new Audio('/notification.mp3');
    audio.play().catch(() => {
      console.log('Não foi possível tocar o som de notificação');
    });

    // Mostrar notificação do navegador
    if (Notification.permission === 'granted') {
      new Notification(newMode === 'focus' ? 'Hora de Focar!' : 'Hora da Pausa!', {
        body: newMode === 'focus' 
          ? 'Vamos trabalhar por mais uma sessão?' 
          : 'Parabéns! Hora de fazer uma pausa.',
        icon: '/favicon.ico'
      });
    }
  }, [state.mode, state.settings]);

  const handleSettingsSave = (newSettings: PomodoroSettings) => {
    setState(prev => {
      const currentMode = prev.mode;
      const newDuration = currentMode === 'focus' ? newSettings.focusDuration : newSettings.breakDuration;
      
      return {
        ...prev,
        settings: newSettings,
        timeLeft: newDuration * 60,
      };
    });
    setIsSettingsOpen(false);
  };

  // Solicitar permissão para notificações
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isRunning && state.timeLeft > 0) {
      interval = setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(interval);
            switchMode();
            return prev;
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isRunning, switchMode, state.timeLeft]);

  const progress = (state.timeLeft / (state.mode === 'focus' ? state.settings.focusDuration * 60 : state.settings.breakDuration * 60)) * 100;

  return (
    <div className="flex flex-col items-center">
      {/* Timer Display */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">
          {state.mode === 'focus' ? 'Foco' : 'Pausa'}
        </h2>
        <div className="text-7xl font-bold text-primary-500">
          {formatTime(state.timeLeft)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTimer}
          className="p-3 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          {state.isRunning ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 rounded-full text-primary-500 hover:bg-primary-50 transition-colors"
        >
          <RotateCcwIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-3 rounded-full text-primary-500 hover:bg-primary-50 transition-colors"
        >
          <Settings2Icon className="h-6 w-6" />
        </button>
      </div>

      <PomodoroSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={state.settings}
        onSave={handleSettingsSave}
      />
    </div>
  );
}