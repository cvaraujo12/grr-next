'use client';

import { useState, useCallback, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventFormModal, Event } from './EventFormModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useGoals } from '@/contexts/goals-context';

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
  const [events, setEvents] = useLocalStorage<Event[]>('calendar-events', []);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [categoryFilter, setCategoryFilter] = useState<Event['category'] | 'all'>('all');
  const { goals } = useGoals();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const generateRecurringEvents = useCallback((event: Event): Event[] => {
    if (!event.isRecurring || !event.recurrence) return [event];

    const events: Event[] = [];
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const duration = endDate.getTime() - startDate.getTime();
    const recurrenceEndDate = event.recurrence.endDate 
      ? new Date(event.recurrence.endDate) 
      : addDays(startDate, 365);

    let currentDate = startDate;

    while (currentDate <= recurrenceEndDate) {
      const newEvent: Event = {
        ...event,
        id: `${event.id}-${currentDate.getTime()}`,
        start: currentDate.toISOString(),
        end: new Date(currentDate.getTime() + duration).toISOString(),
      };
      events.push(newEvent);

      switch (event.recurrence.frequency) {
        case 'daily':
          currentDate = addDays(currentDate, event.recurrence.interval);
          break;
        case 'weekly':
          currentDate = addDays(currentDate, 7 * event.recurrence.interval);
          break;
        case 'monthly':
          currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + event.recurrence.interval,
            currentDate.getDate()
          );
          break;
        case 'yearly':
          currentDate = new Date(
            currentDate.getFullYear() + event.recurrence.interval,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          break;
      }
    }

    return events;
  }, []);

  const processedEvents = useCallback(() => {
    const allEvents: Event[] = [];
    events.forEach(event => {
      if (event.isRecurring) {
        allEvents.push(...generateRecurringEvents(event));
      } else {
        allEvents.push(event);
      }
    });

    if (categoryFilter !== 'all') {
      return allEvents.filter(event => event.category === categoryFilter);
    }

    return allEvents;
  }, [events, generateRecurringEvents, categoryFilter]);

  useEffect(() => {
    const checkEvents = () => {
      events.forEach((event) => {
        if (event.reminder && !event.reminderSent) {
          const eventDate = new Date(event.start);
          const now = new Date();
          const reminderTime = new Date(eventDate.getTime() - 15 * 60000); // 15 minutos antes

          if (now >= reminderTime && now < eventDate) {
            if (Notification.permission === 'granted') {
              new Notification('Lembrete de Evento', {
                body: `O evento "${event.title}" começará em breve!`,
                icon: '/favicon.ico'
              });
              // Marcar o lembrete como enviado
              event.reminderSent = true;
            }
          }
        }
      });
    };

    const interval = setInterval(checkEvents, 60000); // Verificar a cada minuto
    return () => clearInterval(interval);
  }, [events]);

  const handleSelectSlot = useCallback(({ start }: { start: Date }) => {
    setSelectedEvent({
      id: '',
      title: '',
      start: start.toISOString(),
      end: new Date(start.getTime() + 60 * 60 * 1000).toISOString(), // 1 hora depois
      category: 'other',
      isRecurring: false,
    });
    setModalMode('create');
    setShowEventModal(true);
  }, []);

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setModalMode('edit');
    setShowEventModal(true);
  }, []);

  const handleSaveEvent = useCallback((eventData: Omit<Event, 'id'>) => {
    if (modalMode === 'create') {
      const newEvent: Event = {
        ...eventData,
        id: crypto.randomUUID(),
      };
      setEvents(prev => [...prev, newEvent]);
    } else if (selectedEvent) {
      setEvents(prev =>
        prev.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, ...eventData }
            : event
        )
      );
    }
  }, [modalMode, selectedEvent, setEvents]);

  const eventStyleGetter = useCallback((event: Event) => {
    const style: React.CSSProperties = {
      backgroundColor: event.color || '#3B82F6',
      borderRadius: '4px',
      opacity: 0.8,
      color: '#fff',
      border: 'none',
      display: 'block',
      fontSize: isMobile ? '12px' : '14px',
      padding: isMobile ? '2px 4px' : '4px 8px',
    };

    if (event.goalId) {
      const goal = goals.find(g => g.id === event.goalId);
      if (goal) {
        const goalColor = goal.color || (goal.priority === 'high' ? '#EF4444' : 
                                       goal.priority === 'medium' ? '#F59E0B' : '#10B981');
        style.borderLeft = `4px solid ${goalColor}`;
      }
    }

    return {
      style,
    };
  }, [goals, isMobile]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)}
          className="w-full sm:w-auto px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas as Categorias</option>
          <option value="task">Tarefas</option>
          <option value="goal">Metas</option>
          <option value="meeting">Reuniões</option>
          <option value="personal">Pessoal</option>
          <option value="other">Outros</option>
        </select>

        <button
          onClick={() => {
            setSelectedEvent(undefined);
            setModalMode('create');
            setShowEventModal(true);
          }}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Novo Evento
        </button>
      </div>

      <div className="h-[600px] bg-white rounded-lg shadow overflow-hidden">
        <BigCalendar
          localizer={localizer}
          events={processedEvents()}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          messages={{
            next: 'Próximo',
            previous: 'Anterior',
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            agenda: 'Agenda',
            date: 'Data',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'Não há eventos neste período.',
            showMore: (total) => `+ ${total} eventos`,
          }}
          popup
          views={isMobile ? [Views.DAY, Views.AGENDA] : [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          defaultView={isMobile ? Views.DAY : Views.MONTH}
          components={{
            event: (props) => (
              <div className="truncate">
                {props.title}
              </div>
            ),
          }}
        />
      </div>

      <EventFormModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        event={selectedEvent}
        onSave={handleSaveEvent}
        mode={modalMode}
      />
    </div>
  );
}
