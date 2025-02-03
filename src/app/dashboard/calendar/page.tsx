'use client';

import { Calendar } from '@/components/calendar/Calendar';

export default function CalendarPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Calendário
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie seus eventos e compromissos
        </p>
      </div>

      <Calendar />
    </div>
  );
}
