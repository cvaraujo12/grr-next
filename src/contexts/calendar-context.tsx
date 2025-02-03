'use client';

import React, { createContext, useContext, useEffect, useCallback } from 'react';
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

const isValidEvent = (event: unknown): event is CalendarEvent => {
  if (typeof event !== 'object' || event === null) return false;
  const e = event as Record<string, unknown>;
  
  return (
    typeof e.id === 'string' &&
    typeof e.title === 'string' &&
    typeof e.description === 'string' &&
    typeof e.startDate === 'string' &&
    typeof e.endDate === 'string' &&
    typeof e.allDay === 'boolean' &&
    typeof e.category === 'string' &&
    ['work', 'personal', 'study', 'other'].includes(e.category as string) &&
    typeof e.color === 'string' &&
    typeof e.createdAt === 'string' &&
    typeof e.updatedAt === 'string'
  );
};

const validateEvents = (events: unknown[]): CalendarEvent[] => {
  return events.filter(isValidEvent);
};

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('calendar_events', []);

  useEffect(() => {
    const validEvents = validateEvents(events || []);
    if (validEvents.length !== events.length) {
      setEvents(validEvents);
    }
  }, [events, setEvents]);

  const addEvent = useCallback((newEvent: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date().toISOString();
      const event: CalendarEvent = {
        ...newEvent,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: now,
        updatedAt: now,
      };

      if (isValidEvent(event)) {
        setEvents((prevEvents) => [...(prevEvents || []), event]);
      } else {
        console.warn('Attempted to add invalid event:', event);
      }
    } catch (error) {
      console.error('Error adding calendar event:', error);
    }
  }, [setEvents]);

  const updateEvent = useCallback((id: string, updatedFields: Partial<CalendarEvent>) => {
    try {
      setEvents((prevEvents) =>
        (prevEvents || []).map((event) =>
          event.id === id
            ? {
                ...event,
                ...updatedFields,
                updatedAt: new Date().toISOString(),
              }
            : event
        )
      );
    } catch (error) {
      console.error('Error updating calendar event:', error);
    }
  }, [setEvents]);

  const deleteEvent = useCallback((id: string) => {
    try {
      setEvents((prevEvents) => (prevEvents || []).filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting calendar event:', error);
    }
  }, [setEvents]);

  const getEventById = useCallback((id: string) => {
    try {
      return events.find((event) => event.id === id);
    } catch (error) {
      console.error('Error getting calendar event by id:', error);
      return undefined;
    }
  }, [events]);

  const getEventsByDateRange = useCallback((start: Date, end: Date) => {
    try {
      return events.filter((event) => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return eventStart >= start && eventEnd <= end;
      });
    } catch (error) {
      console.error('Error getting events by date range:', error);
      return [];
    }
  }, [events]);

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventsByDateRange,
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}
