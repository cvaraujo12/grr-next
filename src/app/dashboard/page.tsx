'use client';

import { GoalList } from '@/components/goals/GoalList';
import { NoteList } from '@/components/notes/NoteList';
import { PomodoroTimer } from '@/components/pomodoro/PomodoroTimer';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Metas</h2>
          <GoalList />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Notas</h2>
          <NoteList />
        </section>
      </div>
      <div>
        <section>
          <h2 className="text-2xl font-bold mb-4">Pomodoro</h2>
          <PomodoroTimer />
        </section>
      </div>
    </div>
  );
}