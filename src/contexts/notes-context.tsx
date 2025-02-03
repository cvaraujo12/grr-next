'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateId } from '@/utils/generateId';

export interface Note {
  id: string;
  title: string;
  content: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  pinned?: boolean;
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

const isValidNote = (note: unknown): note is Note => {
  if (typeof note !== 'object' || note === null) return false;
  const n = note as Record<string, unknown>;
  
  return (
    typeof n.id === 'string' &&
    typeof n.title === 'string' &&
    typeof n.content === 'string' &&
    typeof n.createdAt === 'string' &&
    typeof n.updatedAt === 'string' &&
    (n.color === undefined || typeof n.color === 'string') &&
    (n.category === undefined || typeof n.category === 'string') &&
    (n.pinned === undefined || typeof n.pinned === 'boolean')
  );
};

const validateNotes = (notes: unknown[]): Note[] => {
  return notes.filter(isValidNote);
};

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validNotes = validateNotes(notes || []);
    if (validNotes.length !== notes.length) {
      setNotes(validNotes);
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [notes, setNotes]);

  const addNote = useCallback((newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date().toISOString();
      const note: Note = {
        ...newNote,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };

      if (isValidNote(note)) {
        setNotes((prevNotes) => [...(prevNotes || []), note]);
      } else {
        console.warn('Attempted to add invalid note:', note);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }, [setNotes]);

  const updateNote = useCallback((id: string, updatedFields: Partial<Note>) => {
    try {
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
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    try {
      setNotes((prevNotes) => (prevNotes || []).filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }, [setNotes]);

  const getNoteById = useCallback(
    (id: string) => notes.find((note) => note.id === id),
    [notes]
  );

  const value = {
    notes,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    getNoteById,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
