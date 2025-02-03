'use client';

import { useState, useEffect } from 'react';
import { useNotes } from '@/contexts/notes-context';
import { Modal } from '../shared/Modal';
import { Note } from '@/contexts/notes-context';

export interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  note?: Note;
}

export function NoteFormModal({ isOpen, onClose, mode, note }: NoteFormModalProps) {
  const { addNote, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);

  // Preencher o formulário com os dados da nota se estiver no modo de edição
  useEffect(() => {
    if (mode === 'edit' && note) {
      setTitle(note.title);
      setContent(note.content);
      setPinned(note.pinned || false);
    }
  }, [mode, note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const noteData = {
      title,
      content,
      pinned,
    };

    if (mode === 'create') {
      addNote(noteData);
    } else if (mode === 'edit' && note) {
      updateNote(note.id, noteData);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold">
          {mode === 'create' ? 'Nova Nota' : 'Editar Nota'}
        </h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Conteúdo
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="pinned"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="pinned" className="ml-2 block text-sm font-medium">
            Fixar nota
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mode === 'create' ? 'Criar' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
