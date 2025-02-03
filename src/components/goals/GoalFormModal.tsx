'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Goal } from '@/contexts/goals-context';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal?: Goal | null;
  onSave: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  mode: 'create' | 'edit';
}

export function GoalFormModal({ isOpen, onClose, goal, onSave, mode }: GoalFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<Goal['status']>('pending');
  const [priority, setPriority] = useState<Goal['priority']>('medium');
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState('#3B82F6');

  useEffect(() => {
    if (mode === 'edit' && goal) {
      setTitle(goal.title);
      setDescription(goal.description);
      setDeadline(goal.deadline || '');
      setStatus(goal.status);
      setPriority(goal.priority);
      setProgress(goal.progress);
      setColor(goal.color || '#3B82F6');
    } else {
      setTitle('');
      setDescription('');
      setDeadline('');
      setStatus('pending');
      setPriority('medium');
      setProgress(0);
      setColor('#3B82F6');
    }
  }, [mode, goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description,
      deadline: deadline || undefined,
      status,
      priority,
      progress,
      color
    };

    onSave(goalData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold">
          {mode === 'create' ? 'Nova Meta' : 'Editar Meta'}
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
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium mb-1">
            Prazo
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Goal['status'])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pendente</option>
            <option value="in_progress">Em progresso</option>
            <option value="completed">Concluído</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1">
            Prioridade
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Goal['priority'])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div>
          <label htmlFor="progress" className="block text-sm font-medium mb-1">
            Progresso
          </label>
          <input
            type="range"
            id="progress"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-sm text-gray-500">{progress}%</div>
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium mb-1">
            Cor
          </label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 px-1 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mode === 'create' ? 'Criar' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}