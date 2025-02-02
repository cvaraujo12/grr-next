'use client';

import { GoalList } from '@/components/goals/GoalList';

export default function GoalsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Metas</h1>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <GoalList />
      </div>
    </div>
  );
}
