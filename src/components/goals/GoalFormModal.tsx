'use client';

import { useState, useEffect } from 'react';
import { useGoals } from '@/contexts/goals-context';
import { Modal } from '../shared/Modal';
import { Goal } from '@/contexts/goals-context';

export interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  goal?: Goal;
}

export function GoalFormModal({ isOpen, onClose, mode, goal }: GoalFormModalProps) {
  const { addGoal, updateGoal } = useGoals();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending');
  const [progress, setProgress] = useState(0);

  // Preencher o formulário com os dados da meta se estiver no modo de edição
  useEffect(() => {
    if (mode === 'edit' && goal) {
      setTitle(goal.title);
      setDescription(goal.description);
      setDeadline(goal.deadline);
      setPriority(goal.priority);
      setStatus(goal.status);
      setProgress(goal.progress);
    }
  }, [mode, goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const goalData = {
      title,
      description,
      deadline,
      priority,
      status,
      progress,
    };

    if (mode === 'create') {
      addGoal(goalData);
    } else if (mode === 'edit' && goal) {
      updateGoal(goal.id, goalData);
    }

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
            rows={3}
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
            required
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1">
            Prioridade
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as 'pending' | 'in_progress' | 'completed')
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pendente</option>
            <option value="in_progress">Em Progresso</option>
            <option value="completed">Concluída</option>
          </select>
        </div>

        <div>
          <label htmlFor="progress" className="block text-sm font-medium mb-1">
            Progresso: {progress}%
          </label>
          <input
            type="range"
            id="progress"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            min="0"
            max="100"
            step="5"
            className="w-full"
          />
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