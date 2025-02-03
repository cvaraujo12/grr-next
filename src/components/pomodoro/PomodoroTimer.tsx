'use client';

import { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Settings } from 'lucide-react';
import { usePomodoro } from '@/contexts/pomodoro-context';
import { PomodoroSettingsModal } from './PomodoroSettingsModal';

export function PomodoroTimer() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
    isRunning,
    timeLeft,
    currentState,
    pomodorosCompleted,
    settings,
    start,
    pause,
    reset,
    skip,
  } = usePomodoro();

  // Formatar o tempo restante
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calcular o progresso para a barra circular
  const calculateProgress = () => {
    let totalTime;
    switch (currentState) {
      case 'work':
        totalTime = settings.workDuration;
        break;
      case 'shortBreak':
        totalTime = settings.shortBreakDuration;
        break;
      case 'longBreak':
        totalTime = settings.longBreakDuration;
        break;
      default:
        totalTime = settings.workDuration;
    }
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const progress = calculateProgress();
  const timeString = formatTime(timeLeft);
  const stateLabel = currentState === 'work' 
    ? 'Foco' 
    : currentState === 'shortBreak' 
    ? 'Pausa Curta' 
    : 'Pausa Longa';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Estado atual */}
      <div className="text-lg font-medium mb-4 text-gray-600 dark:text-gray-300">
        {stateLabel}
      </div>

      {/* Timer circular */}
      <div className="relative w-64 h-64 mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Círculo de fundo */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="fill-none stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="8"
          />
          {/* Círculo de progresso */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="fill-none stroke-blue-600"
            strokeWidth="8"
            strokeDasharray="282.7433388230814"
            strokeDashoffset={282.7433388230814 * (1 - progress / 100)}
            strokeLinecap="round"
          />
        </svg>
        {/* Tempo restante */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-800 dark:text-white">
            {timeString}
          </span>
        </div>
      </div>

      {/* Contador de Pomodoros */}
      <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Pomodoros completados: {pomodorosCompleted}
      </div>

      {/* Controles */}
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          title="Reiniciar"
        >
          <RotateCcw className="w-6 h-6" />
        </button>

        <button
          onClick={isRunning ? pause : start}
          className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          title={isRunning ? 'Pausar' : 'Iniciar'}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <button
          onClick={skip}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          title="Pular"
        >
          <SkipForward className="w-6 h-6" />
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          title="Configurações"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Modal de Configurações */}
      {isSettingsOpen && (
        <PomodoroSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}