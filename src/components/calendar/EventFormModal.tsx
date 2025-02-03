'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { CalendarEvent, useCalendar } from '@/contexts/calendar-context';
import { format } from 'date-fns';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CalendarEvent;
  selectedDate?: Date | null;
  mode: 'create' | 'edit';
}

const COLORS = [
  '#F87171', // red
  '#FB923C', // orange
  '#FBBF24', // amber
  '#34D399', // emerald
  '#60A5FA', // blue
  '#818CF8', // indigo
  '#A78BFA', // violet
  '#F472B6', // pink
];

export function EventFormModal({
  isOpen,
  onClose,
  initialData,
  selectedDate,
  mode,
}: EventFormModalProps) {
  const { addEvent, updateEvent } = useCalendar();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    allDay: false,
    category: 'other' as CalendarEvent['category'],
    color: COLORS[0],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        startDate: format(new Date(initialData.startDate), "yyyy-MM-dd'T'HH:mm"),
        endDate: format(new Date(initialData.endDate), "yyyy-MM-dd'T'HH:mm"),
        allDay: initialData.allDay,
        category: initialData.category,
        color: initialData.color,
      });
    } else if (selectedDate) {
      const startDate = new Date(selectedDate);
      startDate.setHours(9, 0, 0, 0);
      const endDate = new Date(selectedDate);
      endDate.setHours(10, 0, 0, 0);

      setFormData((prev) => ({
        ...prev,
        startDate: format(startDate, "yyyy-MM-dd'T'HH:mm"),
        endDate: format(endDate, "yyyy-MM-dd'T'HH:mm"),
      }));
    }
  }, [initialData, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };

    if (mode === 'create') {
      addEvent(eventData);
    } else if (mode === 'edit' && initialData) {
      updateEvent(initialData.id, eventData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {mode === 'create' ? 'Novo Evento' : 'Editar Evento'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="allDay"
              checked={formData.allDay}
              onChange={(e) => setFormData({ ...formData, allDay: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="allDay" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Evento de dia inteiro
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Início
              </label>
              <input
                type={formData.allDay ? 'date' : 'datetime-local'}
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fim
              </label>
              <input
                type={formData.allDay ? 'date' : 'datetime-local'}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categoria
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as CalendarEvent['category'] })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="work">Trabalho</option>
              <option value="personal">Pessoal</option>
              <option value="study">Estudo</option>
              <option value="other">Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cor
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-6 h-6 rounded-full ${
                    formData.color === color ? 'ring-2 ring-offset-2 ring-primary-500' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
            >
              {mode === 'create' ? 'Criar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
