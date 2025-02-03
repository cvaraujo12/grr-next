'use client';

import { PomodoroTimer } from '@/components/pomodoro/PomodoroTimer';

export default function PomodoroPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Pomodoro Timer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Use a técnica Pomodoro para aumentar sua produtividade
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <PomodoroTimer />
      </div>
    </div>
  );
}
