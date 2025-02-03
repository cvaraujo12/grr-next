'use client';

import { useState, memo } from 'react';
import { MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { Goal, useGoals } from '@/contexts/goals-context';
import { GoalFormModal } from './GoalFormModal';
import { formatDate } from '@/utils/common';

interface GoalCardProps {
  goal: Goal;
}

const getStatusColor = (status: Goal['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    case 'in_progress':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300';
    case 'completed':
      return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
  }
};

const getPriorityColor = (priority: Goal['priority']) => {
  switch (priority) {
    case 'low':
      return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'high':
      return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
  }
};

const getStatusText = (status: Goal['status']) => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'in_progress':
      return 'Em progresso';
    case 'completed':
      return 'Concluído';
    default:
      return 'Desconhecido';
  }
};

const getPriorityText = (priority: Goal['priority']) => {
  switch (priority) {
    case 'low':
      return 'Baixa prioridade';
    case 'medium':
      return 'Média prioridade';
    case 'high':
      return 'Alta prioridade';
    default:
      return 'Prioridade desconhecida';
  }
};

function GoalCardComponent({ goal }: GoalCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { deleteGoal } = useGoals();

  const handleDelete = () => {
    if (goal.id) {
      deleteGoal(goal.id);
      setShowMenu(false);
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
    setShowMenu(false);
  };

  if (!goal) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <button
                onClick={handleEdit}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      {goal.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-3">{goal.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(goal.status)}`}>
          {getStatusText(goal.status)}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(goal.priority)}`}>
          {getPriorityText(goal.priority)}
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {formatDate(goal.deadline)}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
        <div
          className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${Math.min(Math.max(goal.progress, 0), 100)}%` }}
        ></div>
      </div>

      <div className="text-right text-xs text-gray-500 dark:text-gray-400">
        {goal.progress}% completo
      </div>

      {showEditModal && (
        <GoalFormModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          mode="edit"
          goal={goal}
        />
      )}
    </div>
  );
}

export const GoalCard = memo(GoalCardComponent);