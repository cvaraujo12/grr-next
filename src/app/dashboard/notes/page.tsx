'use client';

import { NoteList } from '@/components/notes/NoteList';

export default function NotesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Notas</h1>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <NoteList />
      </div>
    </div>
  );
}
