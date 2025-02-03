'use client';

import { useNotes } from '@/contexts/notes-context';
import { NoteCard } from './NoteCard';
import { NoteFormModal } from './NoteFormModal';
import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';

// Loading skeleton para um card de nota
const NoteCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
    <div className="flex justify-between items-start mb-3">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

// Loading state para a lista de notas
const NoteListSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
    <NoteCardSkeleton />
    <NoteCardSkeleton />
    <NoteCardSkeleton />
  </div>
);

export function NoteList() {
  const { notes, isLoading } = useNotes();
  const [showAddModal, setShowAddModal] = useState(false);

  // Ordenar notas usando useMemo para evitar re-ordenação desnecessária
  const sortedNotes = useMemo(() => {
    if (!notes) return [];

    return [...notes].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [notes]);

  // Renderizar o botão de adicionar
  const renderAddButton = () => (
    <button
      onClick={() => setShowAddModal(true)}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <Plus className="w-4 h-4" />
      Adicionar Nota
    </button>
  );

  // Renderizar a lista de notas
  const renderNotesList = () => {
    if (isLoading) {
      return <NoteListSkeleton />;
    }

    if (!notes || notes.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhuma nota ainda. Clique em Adicionar Nota para começar!
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {sortedNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    );
  };

  // Renderizar o modal de adicionar
  const renderAddModal = () => {
    if (!showAddModal) return null;
    
    return (
      <NoteFormModal
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
        {renderNotesList()}
      </div>

      {renderAddModal()}
    </div>
  );
}
