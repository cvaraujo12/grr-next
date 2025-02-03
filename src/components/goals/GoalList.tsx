'use client';

import { useState, useMemo } from 'react';
import { useGoals } from '@/contexts/goals-context';
import { GoalCard } from './GoalCard';
import { GoalFormModal } from './GoalFormModal';
import { Plus } from 'lucide-react';

// Loading skeleton para um card de meta
const GoalCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
    <div className="flex justify-between items-start mb-3">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
    <div className="flex flex-wrap gap-2 mb-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1"></div>
  </div>
);

// Loading state para a lista de metas
const GoalListSkeleton = () => (
  <div className="space-y-4">
    <GoalCardSkeleton />
    <GoalCardSkeleton />
    <GoalCardSkeleton />
  </div>
);

export function GoalList() {
  const { goals, isLoading } = useGoals();
  const [showAddModal, setShowAddModal] = useState(false);

  // Ordenar metas usando useMemo para evitar re-ordenação desnecessária
  const sortedGoals = useMemo(() => {
    if (!goals) return [];
    
    return [...goals].sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') return 1;
      if (a.status !== 'completed' && b.status === 'completed') return -1;
      
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [goals]);

  // Renderizar o botão de adicionar
  const renderAddButton = () => (
    <button
      onClick={() => setShowAddModal(true)}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <Plus className="w-4 h-4" />
      Adicionar Meta
    </button>
  );

  // Renderizar a lista de metas
  const renderGoalsList = () => {
    if (isLoading) {
      return <GoalListSkeleton />;
    }

    if (!goals || goals.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhuma meta ainda. Clique em Adicionar Meta para começar!
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {sortedGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    );
  };

  // Renderizar o modal de adicionar
  const renderAddModal = () => {
    if (!showAddModal) return null;
    
    return (
      <GoalFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        mode="create"
      />
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        {renderAddButton()}
      </div>

      <div className="w-full">
        {renderGoalsList()}
      </div>

      {renderAddModal()}
    </div>
  );
}