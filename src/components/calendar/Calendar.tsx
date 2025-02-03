'use client';

import { useState, useCallback, useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventFormModal } from './EventFormModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
  category?: string;
}

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export function Calendar() {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('calendar-events', []);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  // Garantir que os eventos são válidos para o BigCalendar
  const calendarEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];

    return events
      .filter(event => {
        if (!event?.id || !event?.title || !event?.start || !event?.end) {
          return false;
        }
        return true;
      })
      .map(event => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        color: event.color || '#3B82F6'
      }));
  }, [events]);

  const handleSelectSlot = useCallback(() => {
    setSelectedEvent(null);
    setModalMode('create');
    setShowEventModal(true);
  }, []);

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    const foundEvent = events.find(e => e.id === event.id);
    if (foundEvent) {
      setSelectedEvent(foundEvent);
      setModalMode('edit');
      setShowEventModal(true);
    }
  }, [events]);

  const handleSaveEvent = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
    if (modalMode === 'create') {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setEvents(prev => [...prev, newEvent]);
    } else if (selectedEvent) {
      setEvents(prev =>
        prev.map(event =>
          event.id === selectedEvent.id
            ? { ...event, ...eventData }
            : event
        )
      );
    }
    setShowEventModal(false);
  }, [modalMode, selectedEvent, setEvents]);

  const eventStyleGetter = useCallback((event: CalendarEvent) => ({
    style: {
      backgroundColor: event.color || '#3B82F6',
      borderRadius: '4px',
      opacity: 0.8,
      color: '#fff',
      border: 'none',
      display: 'block'
    }
  }), []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setSelectedEvent(null);
            setModalMode('create');
            setShowEventModal(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Novo Evento
        </button>
      </div>

      <div className="h-[600px] bg-white rounded-lg shadow overflow-hidden">
        <BigCalendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={Views.MONTH}
          messages={{
            next: 'Próximo',
            previous: 'Anterior',
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            date: 'Data',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'Não há eventos neste período.',
            showMore: (total) => `+ ${total} eventos`,
          }}
        />
      </div>

      {showEventModal && (
        <EventFormModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          event={selectedEvent}
          onSave={handleSaveEvent}
          mode={modalMode}
        />
      )}
    </div>
  );
}
