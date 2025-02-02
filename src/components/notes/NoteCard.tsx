'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Note, NoteCategory } from '@/types/note';
import { cn } from '@/lib/utils';

interface NoteCardProps {
  note: Note;
  className?: string;
  onClick?: () => void;
}

const categoryConfig: Record<NoteCategory, { label: string; className: string }> = {
  personal: {
    label: 'Pessoal',
    className: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  },
  work: {
    label: 'Trabalho',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  study: {
    label: 'Estudo',
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  },
  other: {
    label: 'Outro',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  },
};

export function NoteCard({ note, className, onClick }: NoteCardProps) {
  const formattedDate = format(new Date(note.updatedAt), "dd 'de' MMMM 'às' HH:mm", {
    locale: ptBR,
  });

  return (
    <div
      className={cn(
        'group relative p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all',
        note.color ? `bg-${note.color}-50 dark:bg-${note.color}-900/10` : 'bg-white dark:bg-gray-900',
        className
      )}
      onClick={onClick}
      style={note.color ? undefined : { backgroundColor: note.color }}
    >
      {note.pinned && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full shadow-sm" />
      )}
      
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {note.title}
          </h3>
          <span
            className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              categoryConfig[note.category].className
            )}
          >
            {categoryConfig[note.category].label}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {note.content}
        </p>

        <div className="pt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Atualizado {formattedDate}</span>
          
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-1 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                // Aqui você pode adicionar a função de edição
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            
            <button
              className="p-1 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                // Aqui você pode adicionar a função de exclusão
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 