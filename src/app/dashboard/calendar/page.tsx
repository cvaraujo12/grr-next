'use client';

import { Calendar } from '@/components/calendar/Calendar';

export default function CalendarPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Calendário</h1>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <Calendar />
      </div>
    </div>
  );
}
