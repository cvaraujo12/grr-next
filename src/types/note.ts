export type NoteCategory = 'personal' | 'work' | 'study' | 'other';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  createdAt: string;
  updatedAt: string;
  pinned?: boolean;
  color?: string;
} 