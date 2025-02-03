'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  notifications: boolean;
  sound: boolean;
}

interface PomodoroContextType {
  isRunning: boolean;
  isPaused: boolean;
  timeLeft: number;
  currentSession: 'work' | 'shortBreak' | 'longBreak';
  settings: PomodoroSettings;
  completedPomodoros: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  skip: () => void;
  updateSettings: (settings: Partial<PomodoroSettings>) => void;
}

const defaultSettings: PomodoroSettings = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  longBreakInterval: 4,
  autoStartBreaks: true,
  autoStartPomodoros: true,
  notifications: true,
  sound: true,
};

const PomodoroContext = createContext<PomodoroContextType | null>(null);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useLocalStorage<PomodoroSettings>('pomodoro_settings', defaultSettings);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration);
  const [currentSession, setCurrentSession] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedSettings = settings;
    if (storedSettings) {
      setSettings({ ...defaultSettings, ...storedSettings });
    }
  }, [settings, setSettings]);

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const reset = useCallback(() => {
    if (timer) clearInterval(timer);
    setTimer(null);
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(settings.workDuration);
    setCurrentSession('work');
    setCompletedPomodoros(0);
  }, [timer, settings.workDuration]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (currentSession === 'work') {
            const newCompletedPomodoros = completedPomodoros + 1;
            setCompletedPomodoros(newCompletedPomodoros);
            
            if (newCompletedPomodoros % settings.longBreakInterval === 0) {
              setCurrentSession('longBreak');
              return settings.longBreakDuration;
            } else {
              setCurrentSession('shortBreak');
              return settings.shortBreakDuration;
            }
          } else {
            setCurrentSession('work');
            return settings.workDuration;
          }
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(newTimer);
  }, [settings, currentSession, completedPomodoros]);

  const pause = useCallback(() => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsPaused(true);
    setIsRunning(false);
  }, [timer]);

  const resume = useCallback(() => {
    start();
  }, [start]);

  const stop = useCallback(() => {
    reset();
  }, [reset]);

  const skip = useCallback(() => {
    setTimeLeft(1);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<PomodoroSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    if (!isRunning) {
      setTimeLeft(newSettings.workDuration || settings.workDuration);
    }
  }, [setSettings, isRunning, settings.workDuration]);

  const value = {
    isRunning,
    isPaused,
    timeLeft,
    currentSession,
    settings,
    completedPomodoros,
    start,
    pause,
    resume,
    stop,
    skip,
    updateSettings,
  };

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
}
