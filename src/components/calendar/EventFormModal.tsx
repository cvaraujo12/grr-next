'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { useGoals } from '@/contexts/goals-context';

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  color?: string;
  category: 'task' | 'goal' | 'meeting' | 'personal' | 'other';
  goalId?: string;
  isRecurring?: boolean;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
  };
  reminder?: {
    enabled: boolean;
    time: number; // minutos antes do evento
  };
}

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event;
  onSave: (event: Omit<Event, 'id'>) => void;
  mode: 'create' | 'edit';
}

export function EventFormModal({ isOpen, onClose, event, onSave, mode }: EventFormModalProps) {
  const { goals } = useGoals();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [category, setCategory] = useState<Event['category']>('task');
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState(30);

  useEffect(() => {
    if (mode === 'edit' && event) {
      setTitle(event.title);
      setDescription(event.description || '');
      const start = new Date(event.start);
      const end = new Date(event.end);
      
      setStartDate(start.toISOString().split('T')[0]);
      setStartTime(start.toTimeString().slice(0, 5));
      setEndDate(end.toISOString().split('T')[0]);
      setEndTime(end.toTimeString().slice(0, 5));
      setColor(event.color || '#3B82F6');
      setCategory(event.category);
      setSelectedGoalId(event.goalId || '');
      setIsRecurring(event.isRecurring || false);
      if (event.recurrence) {
        setRecurrenceFrequency(event.recurrence.frequency);
        setRecurrenceInterval(event.recurrence.interval);
        setRecurrenceEndDate(event.recurrence.endDate || '');
      }
      if (event.reminder) {
        setReminderEnabled(event.reminder.enabled);
        setReminderTime(event.reminder.time);
      }
    }
  }, [mode, event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    const eventData: Omit<Event, 'id'> = {
      title,
      description,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      color,
      category,
      ...(selectedGoalId && { goalId: selectedGoalId }),
      isRecurring,
      ...(isRecurring && {
        recurrence: {
          frequency: recurrenceFrequency,
          interval: recurrenceInterval,
          ...(recurrenceEndDate && { endDate: recurrenceEndDate }),
        },
      }),
      reminder: {
        enabled: reminderEnabled,
        time: reminderTime,
      },
    };

    onSave(eventData);
    onClose();
  };

  const COLORS = [
    '#3B82F6', // blue
    '#EF4444', // red
    '#10B981', // green
    '#F59E0B', // yellow
    '#8B5CF6', // purple
    '#EC4899', // pink
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold">
          {mode === 'create' ? 'Novo Evento' : 'Editar Evento'}
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
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Categoria
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Event['category'])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="task">Tarefa</option>
            <option value="goal">Meta</option>
            <option value="meeting">Reunião</option>
            <option value="personal">Pessoal</option>
            <option value="other">Outro</option>
          </select>
        </div>

        {category === 'goal' && (
          <div>
            <label htmlFor="goalId" className="block text-sm font-medium mb-1">
              Meta Relacionada
            </label>
            <select
              id="goalId"
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma meta</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-1">
              Data Início
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium mb-1">
              Hora Início
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-1">
              Data Fim
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium mb-1">
              Hora Fim
            </label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium">Evento Recorrente</span>
          </label>
        </div>

        {isRecurring && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="recurrenceFrequency" className="block text-sm font-medium mb-1">
                  Frequência
                </label>
                <select
                  id="recurrenceFrequency"
                  value={recurrenceFrequency}
                  onChange={(e) => setRecurrenceFrequency(e.target.value as typeof recurrenceFrequency)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Diariamente</option>
                  <option value="weekly">Semanalmente</option>
                  <option value="monthly">Mensalmente</option>
                  <option value="yearly">Anualmente</option>
                </select>
              </div>
              <div>
                <label htmlFor="recurrenceInterval" className="block text-sm font-medium mb-1">
                  Intervalo
                </label>
                <input
                  type="number"
                  id="recurrenceInterval"
                  value={recurrenceInterval}
                  onChange={(e) => setRecurrenceInterval(Number(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="recurrenceEndDate" className="block text-sm font-medium mb-1">
                Data Final da Recorrência
              </label>
              <input
                type="date"
                id="recurrenceEndDate"
                value={recurrenceEndDate}
                onChange={(e) => setRecurrenceEndDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={(e) => setReminderEnabled(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium">Ativar Lembrete</span>
          </label>
        </div>

        {reminderEnabled && (
          <div>
            <label htmlFor="reminderTime" className="block text-sm font-medium mb-1">
              Lembrar Antes (minutos)
            </label>
            <select
              id="reminderTime"
              value={reminderTime}
              onChange={(e) => setReminderTime(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5 minutos</option>
              <option value="10">10 minutos</option>
              <option value="15">15 minutos</option>
              <option value="30">30 minutos</option>
              <option value="60">1 hora</option>
              <option value="120">2 horas</option>
              <option value="1440">1 dia</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            Cor
          </label>
          <div className="flex gap-2">
            {COLORS.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                onClick={() => setColor(colorOption)}
                className={`w-8 h-8 rounded-full ${
                  color === colorOption ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: colorOption }}
              />
            ))}
          </div>
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
