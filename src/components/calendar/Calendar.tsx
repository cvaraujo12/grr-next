'use client';

import { useState } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useCalendar } from '@/contexts/calendar-context';
import { EventFormModal } from './EventFormModal';

type Week = Date[];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const { getEventsByDateRange } = useCalendar();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { locale: ptBR });
  const endDate = endOfWeek(monthEnd, { locale: ptBR });

  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
  const weeks: Week[] = [];
  let week: Week = [];

  dateRange.forEach((date) => {
    week.push(date);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  const monthEvents = getEventsByDateRange(startDate, endDate);

  const getEventsForDate = (date: Date) => {
    return monthEvents.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return date >= eventStart && date <= eventEnd;
    });
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Cabeçalho do Calendário */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedDate(new Date());
            setShowEventModal(true);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
        >
          <Plus className="w-4 h-4" />
          Novo Evento
        </button>
      </div>

      {/* Grade do Calendário */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 h-[600px]">
        {weeks.map((week, weekIndex) =>
          week.map((date, dateIndex) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentMonth = isSameMonth(date, currentDate);
            const isToday = isSameDay(date, new Date());

            return (
              <div
                key={date.toString()}
                onClick={() => handleDateClick(date)}
                className={`
                  min-h-[100px] p-2 border-r border-b border-gray-200 dark:border-gray-700 
                  ${isCurrentMonth ? '' : 'bg-gray-50 dark:bg-gray-900'}
                  ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer
                  ${dateIndex === 6 ? 'border-r-0' : ''}
                  ${weekIndex === weeks.length - 1 ? 'border-b-0' : ''}
                `}
              >
                <div className="flex flex-col h-full">
                  <span
                    className={`
                      text-sm font-medium mb-1
                      ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}
                      ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}
                    `}
                  >
                    {format(date, 'd')}
                  </span>
                  <div className="flex-1 space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="px-1.5 py-0.5 text-xs font-medium rounded truncate"
                        style={{ backgroundColor: event.color + '20', color: event.color }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{dayEvents.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de Evento */}
      {showEventModal && (
        <EventFormModal
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setSelectedDate(null);
          }}
          selectedDate={selectedDate}
          mode="create"
        />
      )}
    </div>
  );
}
