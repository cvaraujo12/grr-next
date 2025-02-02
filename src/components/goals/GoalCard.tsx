'use client';

import { formatDate } from '@/lib/utils/shared';
import { Goal } from '@/types';
import { CalendarIcon, CheckCircle2Icon, CircleIcon } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onToggleComplete?: (id: string) => void;
  onEdit?: (goal: Goal) => void;
  onDelete?: (id: string) => void;
}

export function GoalCard({ goal, onToggleComplete, onEdit, onDelete }: GoalCardProps) {
  return (
    <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleComplete?.(goal.id)}
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              {goal.completed ? (
                <CheckCircle2Icon className="h-5 w-5" />
              ) : (
                <CircleIcon className="h-5 w-5" />
              )}
            </button>
            <h3 className={`font-semibold ${goal.completed ? 'line-through text-neutral-500' : ''}`}>
              {goal.title}
            </h3>
          </div>
          
          {goal.description && (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {goal.description}
            </p>
          )}
          
          {goal.dueDate && (
            <div className="mt-2 flex items-center gap-1 text-sm text-neutral-500">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatDate(goal.dueDate)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit?.(goal)}
            className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete?.(goal.id)}
            className="p-2 text-red-600 hover:text-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
} 