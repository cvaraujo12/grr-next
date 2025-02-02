'use client';

import { PomodoroTimer } from '@/components/pomodoro/PomodoroTimer';

export default function PomodoroPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Pomodoro</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <PomodoroTimer />
      </div>
    </div>
  );
}
