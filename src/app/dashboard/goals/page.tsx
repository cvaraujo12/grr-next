'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useGoals } from '@/contexts/goals-context';
import { GoalCard } from '@/components/goals/GoalCard';
import { GoalFormModal } from '@/components/goals/GoalFormModal';

export default function GoalsPage() {
  const { goals } = useGoals();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Minhas Metas</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Defina e acompanhe suas metas de forma organizada
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
          >
            <Plus className="w-4 h-4" />
            Nova Meta
          </button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total de Metas</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {goals.length}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400">Metas Concluídas</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {goals.filter((goal) => goal.status === 'completed').length}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400">Em Progresso</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {goals.filter((goal) => goal.status === 'in_progress').length}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Metas */}
      <div className="grid gap-4">
        {goals.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              Você ainda não tem nenhuma meta. Que tal criar uma agora?
            </p>
          </div>
        ) : (
          goals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
        )}
      </div>

      {/* Modal de Criação */}
      {showCreateModal && (
        <GoalFormModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          mode="create"
        />
      )}
    </div>
  );
}
