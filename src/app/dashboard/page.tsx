'use client';

import { PomodoroTimer } from '@/components/pomodoro/PomodoroTimer';
import { GoalList } from '@/components/goals/GoalList';
import { NoteList } from '@/components/notes/NoteList';
import { Calendar } from '@/components/calendar/Calendar';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h1>
        <p className="mt-1 text-gray-600">Aqui está um resumo das suas atividades.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-medium">Nova Meta</h3>
          <p className="text-sm text-gray-500 mt-1">Adicionar meta</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-medium">Nova Nota</h3>
          <p className="text-sm text-gray-500 mt-1">Criar nota</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-medium">Pomodoro</h3>
          <p className="text-sm text-gray-500 mt-1">Iniciar sessão</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-medium">Calendário</h3>
          <p className="text-sm text-gray-500 mt-1">Ver eventos</p>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Pomodoro Timer - Larger on mobile */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Pomodoro Timer</h2>
            <PomodoroTimer />
          </div>
        </div>

        {/* Goals - Stack on mobile */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Metas Recentes</h2>
          <GoalList />
        </div>

        {/* Notes - Stack on mobile */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Notas Recentes</h2>
          <NoteList />
        </div>

        {/* Calendar - Full width on mobile */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Calendário</h2>
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}