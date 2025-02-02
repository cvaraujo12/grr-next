'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editNote, setEditNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title.trim(),
      content: newNote.content.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '' });
    setIsCreating(false);
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditNote({ title: note.title, content: note.content });
  };

  const saveEdit = (id: string) => {
    if (!editNote.title.trim() || !editNote.content.trim()) return;

    setNotes(prev => prev.map(note => {
      if (note.id === id) {
        return {
          ...note,
          title: editNote.title.trim(),
          content: editNote.content.trim(),
          updatedAt: new Date(),
        };
      }
      return note;
    }));
    setEditingId(null);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Add new note button */}
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full p-4 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Nova Nota</span>
          </div>
        </button>
      )}

      {/* New note form */}
      {isCreating && (
        <div className="border rounded-lg p-4 space-y-3 bg-white">
          <input
            type="text"
            value={newNote.title}
            onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Título"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <textarea
            value={newNote.content}
            onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Conteúdo"
            rows={4}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={addNote}
              className="px-4 py-2 text-sm text-white bg-primary-500 rounded hover:bg-primary-600"
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      {/* Notes list */}
      <div className="space-y-4">
        {notes.length === 0 && !isCreating ? (
          <p className="text-center text-gray-500 py-4">
            Nenhuma nota cadastrada. Clique em "Nova Nota" para começar!
          </p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="border rounded-lg p-4 bg-white">
              {editingId === note.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editNote.title}
                    onChange={(e) => setEditNote(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <textarea
                    value={editNote.content}
                    onChange={(e) => setEditNote(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => saveEdit(note.id)}
                      className="p-1 text-green-500 hover:text-green-600 rounded"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(note)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
                  <div className="mt-2 text-xs text-gray-400">
                    Atualizado em {note.updatedAt.toLocaleDateString()}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
