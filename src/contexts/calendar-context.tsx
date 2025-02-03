'use client';

import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  category: 'work' | 'personal' | 'study' | 'other';
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface CalendarContextType {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => CalendarEvent | undefined;
  getEventsByDateRange: (start: Date, end: Date) => CalendarEvent[];
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('calendar_events', []);

  const addEvent = (newEvent: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const event: CalendarEvent = {
      ...newEvent,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const updateEvent = (id: string, updatedFields: Partial<CalendarEvent>) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? {
              ...event,
              ...updatedFields,
              updatedAt: new Date().toISOString(),
            }
          : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const getEventById = (id: string) => {
    return events.find((event) => event.id === id);
  };

  const getEventsByDateRange = (start: Date, end: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return eventStart <= end && eventEnd >= start;
    });
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventById,
        getEventsByDateRange,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}
