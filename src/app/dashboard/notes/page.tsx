'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNotes } from '@/contexts/notes-context';
import { NoteCard } from '@/components/notes/NoteCard';
import { NoteFormModal } from '@/components/notes/NoteFormModal';

export default function NotesPage() {
  const { notes } = useNotes();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Primeiro ordena por fixado
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      // Depois por data de atualização
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.pinned);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Minhas Notas
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize suas ideias e pensamentos
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
          >
            <Plus className="w-4 h-4" />
            Nova Nota
          </button>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Lista de Notas */}
      <div className="space-y-6">
        {/* Notas Fixadas */}
        {pinnedNotes.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Notas Fixadas
            </h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {pinnedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {/* Outras Notas */}
        {unpinnedNotes.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Outras Notas
            </h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {unpinnedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {/* Mensagem quando não há notas */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm
                ? 'Nenhuma nota encontrada para sua pesquisa.'
                : 'Você ainda não tem nenhuma nota. Que tal criar uma agora?'}
            </p>
          </div>
        )}
      </div>

      {/* Modal de Criação */}
      {showCreateModal && (
        <NoteFormModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          mode="create"
        />
      )}
    </div>
  );
}
