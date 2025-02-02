'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Task, TaskPriority, TaskStatus } from '@/types/task';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  className?: string;
  onClick?: () => void;
}

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  low: {
    label: 'Baixa',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  medium: {
    label: 'Média',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  high: {
    label: 'Alta',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
};

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pendente',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  },
  in_progress: {
    label: 'Em Progresso',
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  },
  completed: {
    label: 'Concluída',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
};

export function TaskCard({ task, className, onClick }: TaskCardProps) {
  const formattedDate = task.dueDate
    ? format(new Date(task.dueDate), "dd 'de' MMMM", { locale: ptBR })
    : null;

  return (
    <div
      className={cn(
        'p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {task.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {task.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              priorityConfig[task.priority].className
            )}
          >
            {priorityConfig[task.priority].label}
          </span>
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              statusConfig[task.status].className
            )}
          >
            {statusConfig[task.status].label}
          </span>
        </div>
      </div>
      
      {formattedDate && (
        <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg
            className="mr-1.5 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Data de entrega: {formattedDate}
        </div>
      )}
    </div>
  );
} 