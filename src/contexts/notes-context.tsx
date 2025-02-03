'use client';

import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface Note {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotesContextType {
  notes: Note[];
  isLoading: boolean;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | null>(null);

// Validar se um objeto é uma nota válida
const isValidNote = (note: unknown): note is Note => {
  if (typeof note !== 'object' || note === null) return false;
  const n = note as Record<string, unknown>;
  
  return (
    typeof n.id === 'string' &&
    typeof n.title === 'string' &&
    typeof n.content === 'string' &&
    typeof n.pinned === 'boolean' &&
    typeof n.createdAt === 'string' &&
    typeof n.updatedAt === 'string'
  );
};

// Validar um array de notas
const validateNotes = (notes: unknown[]): Note[] => {
  return notes.filter(isValidNote);
};

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [isLoading, setIsLoading] = useState(true);

  // Validar as notas ao inicializar e simular um pequeno delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Validar as notas e memoizar o resultado
  const validatedNotes = useMemo(() => validateNotes(notes || []), [notes]);

  const addNote = useCallback((newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const note: Note = {
      ...newNote,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    if (isValidNote(note)) {
      setNotes((prevNotes) => [...(prevNotes || []), note]);
    } else {
      console.warn('Attempted to add invalid note:', note);
    }
  }, [setNotes]);

  const updateNote = useCallback((id: string, updatedFields: Partial<Note>) => {
    setNotes((prevNotes) =>
      (prevNotes || []).map((note) =>
        note.id === id
          ? {
              ...note,
              ...updatedFields,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes((prevNotes) => (prevNotes || []).filter((note) => note.id !== id));
  }, [setNotes]);

  const getNoteById = useCallback((id: string) => {
    return validatedNotes.find((note) => note.id === id);
  }, [validatedNotes]);

  const value = useMemo(
    () => ({
      notes: validatedNotes,
      isLoading,
      addNote,
      updateNote,
      deleteNote,
      getNoteById,
    }),
    [validatedNotes, isLoading, addNote, updateNote, deleteNote, getNoteById]
  );

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
