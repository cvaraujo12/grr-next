'use client';

import { useEffect, useState } from 'react';
import { usePomodoro } from '@/contexts/pomodoro-context';
import { formatTime } from '@/utils/formatTime';
import { Play, Pause, SkipForward, StopCircle } from 'lucide-react';

export function PomodoroTimer() {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const {
    isRunning,
    isPaused,
    timeLeft,
    currentSession,
    completedPomodoros,
    settings,
    start,
    pause,
    resume,
    stop,
    skip,
  } = usePomodoro();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  const getSessionLabel = () => {
    switch (currentSession) {
      case 'work':
        return 'Foco';
      case 'shortBreak':
        return 'Pausa Curta';
      case 'longBreak':
        return 'Pausa Longa';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {getSessionLabel()}
        </h2>
        <div className="text-6xl font-bold text-gray-900 dark:text-white">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {!isRunning && !isPaused && (
          <button
            onClick={start}
            className="p-2 text-green-600 hover:text-green-700 focus:outline-none"
            title="Iniciar"
          >
            <Play className="w-8 h-8" />
          </button>
        )}

        {isRunning && (
          <button
            onClick={pause}
            className="p-2 text-yellow-600 hover:text-yellow-700 focus:outline-none"
            title="Pausar"
          >
            <Pause className="w-8 h-8" />
          </button>
        )}

        {isPaused && (
          <button
            onClick={resume}
            className="p-2 text-green-600 hover:text-green-700 focus:outline-none"
            title="Continuar"
          >
            <Play className="w-8 h-8" />
          </button>
        )}

        {(isRunning || isPaused) && (
          <>
            <button
              onClick={stop}
              className="p-2 text-red-600 hover:text-red-700 focus:outline-none"
              title="Parar"
            >
              <StopCircle className="w-8 h-8" />
            </button>

            <button
              onClick={skip}
              className="p-2 text-blue-600 hover:text-blue-700 focus:outline-none"
              title="Pular"
            >
              <SkipForward className="w-8 h-8" />
            </button>
          </>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Pomodoros Completados: {completedPomodoros}
        </p>
      </div>

      {settings.notifications && typeof window !== 'undefined' && 'Notification' in window && notificationPermission === 'default' && (
        <button
          onClick={requestNotificationPermission}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ativar Notificações
        </button>
      )}
    </div>
  );
}