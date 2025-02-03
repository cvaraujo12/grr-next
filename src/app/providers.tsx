'use client';

import { NotesProvider } from '@/contexts/notes-context';
import { GoalsProvider } from '@/contexts/goals-context';
import { CalendarProvider } from '@/contexts/calendar-context';
import { PomodoroProvider } from '@/contexts/pomodoro-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PomodoroProvider>
      <NotesProvider>
        <GoalsProvider>
          <CalendarProvider>
            {children}
          </CalendarProvider>
        </GoalsProvider>
      </NotesProvider>
    </PomodoroProvider>
  );
}
