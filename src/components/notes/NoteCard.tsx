'use client';

import { useState } from 'react';
import { Note, useNotes } from '@/contexts/notes-context';
import { MoreVertical, Pin, PinOff, Trash2, Edit } from 'lucide-react';
import { NoteFormModal } from './NoteFormModal';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { deleteNote, updateNote } = useNotes();

  const handleDeleteNote = () => {
    deleteNote(note.id);
    setShowMenu(false);
  };

  const handleTogglePin = () => {
    updateNote(note.id, { pinned: !note.pinned });
    setShowMenu(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {note.title}
        </h3>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
              <button
                onClick={handleTogglePin}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {note.pinned ? (
                  <>
                    <PinOff className="w-4 h-4 mr-2" />
                    Desafixar
                  </>
                ) : (
                  <>
                    <Pin className="w-4 h-4 mr-2" />
                    Fixar
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowEditModal(true);
                  setShowMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </button>
              <button
                onClick={handleDeleteNote}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap mb-3">
        {note.content}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>
          {new Date(note.updatedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </span>
        {note.pinned && <Pin className="w-4 h-4" />}
      </div>

      {showEditModal && (
        <NoteFormModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          mode="edit"
          note={note}
        />
      )}
    </div>
  );
}