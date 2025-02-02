'use client';

import { useState } from 'react';
import { Goal } from '@/types';
import { Plus, Check, X, Pencil, Trash2 } from 'lucide-react';

export function GoalList() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const addGoal = () => {
    if (!newGoal.trim()) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setGoals(prev => [goal, ...prev]);
    setNewGoal('');
  };

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        return { ...goal, completed: !goal.completed, updatedAt: new Date() };
      }
      return goal;
    }));
  };

  const startEditing = (goal: Goal) => {
    setEditingId(goal.id);
    setEditText(goal.title);
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) return;

    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        return { ...goal, title: editText.trim(), updatedAt: new Date() };
      }
      return goal;
    }));
    setEditingId(null);
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Add new goal */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addGoal()}
          placeholder="Nova meta..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={addGoal}
          className="p-2 text-white bg-primary-500 rounded-lg hover:bg-primary-600"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Goals list */}
      <div className="space-y-2">
        {goals.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            Nenhuma meta cadastrada. Adicione sua primeira meta!
          </p>
        ) : (
          goals.map(goal => (
            <div
              key={goal.id}
              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`p-1 rounded-full ${
                  goal.completed
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Check className="w-4 h-4" />
              </button>

              {editingId === goal.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(goal.id)}
                    className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={() => saveEdit(goal.id)}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <span className={`flex-1 ${goal.completed ? 'line-through text-gray-400' : ''}`}>
                    {goal.title}
                  </span>
                  <button
                    onClick={() => startEditing(goal)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}