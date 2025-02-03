import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PomodoroProvider } from '@/contexts/pomodoro-context';
import { GoalsProvider } from '@/contexts/goals-context';
import { NotesProvider } from '@/contexts/notes-context';
import { CalendarProvider } from '@/contexts/calendar-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PomodoroProvider>
      <GoalsProvider>
        <NotesProvider>
          <CalendarProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </CalendarProvider>
        </NotesProvider>
      </GoalsProvider>
    </PomodoroProvider>
  );
}
