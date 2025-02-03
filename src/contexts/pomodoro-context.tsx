'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type PomodoroState = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroContextType {
  isRunning: boolean;
  timeLeft: number;
  currentState: PomodoroState;
  pomodorosCompleted: number;
  settings: {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    longBreakInterval: number;
  };
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  updateSettings: (settings: PomodoroContextType['settings']) => void;
}

const defaultSettings = {
  workDuration: 25 * 60, // 25 minutes in seconds
  shortBreakDuration: 5 * 60, // 5 minutes in seconds
  longBreakDuration: 15 * 60, // 15 minutes in seconds
  longBreakInterval: 4, // Number of pomodoros before long break
};

const PomodoroContext = createContext<PomodoroContextType | null>(null);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(defaultSettings.workDuration);
  const [currentState, setCurrentState] = useState<PomodoroState>('work');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [settings, setSettings] = useState(defaultSettings);

  const notify = useCallback(() => {
    if (Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: `${currentState === 'work' ? 'Time for a break!' : 'Back to work!'}`,
        icon: '/favicon.ico',
      });
    }

    // Tocar som de notificação
    const audio = new Audio('/notification.mp3');
    audio.play().catch(console.error);
  }, [currentState]);

  const handleTimerComplete = useCallback(() => {
    notify();
    setIsRunning(false);

    if (currentState === 'work') {
      const newPomodorosCompleted = pomodorosCompleted + 1;
      setPomodorosCompleted(newPomodorosCompleted);

      if (newPomodorosCompleted % settings.longBreakInterval === 0) {
        setCurrentState('longBreak');
        setTimeLeft(settings.longBreakDuration);
      } else {
        setCurrentState('shortBreak');
        setTimeLeft(settings.shortBreakDuration);
      }
    } else {
      setCurrentState('work');
      setTimeLeft(settings.workDuration);
    }
  }, [currentState, pomodorosCompleted, settings, notify]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleTimerComplete]);

  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  
  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentState('work');
    setTimeLeft(settings.workDuration);
    setPomodorosCompleted(0);
  }, [settings]);

  const skip = useCallback(() => {
    setTimeLeft(0);
  }, []);

  const updateSettings = useCallback((newSettings: PomodoroContextType['settings']) => {
    setSettings(newSettings);
    // Se estiver no estado correspondente, atualiza o tempo restante
    if (currentState === 'work') {
      setTimeLeft(newSettings.workDuration);
    } else if (currentState === 'shortBreak') {
      setTimeLeft(newSettings.shortBreakDuration);
    } else {
      setTimeLeft(newSettings.longBreakDuration);
    }
  }, [currentState]);

  return (
    <PomodoroContext.Provider
      value={{
        isRunning,
        timeLeft,
        currentState,
        pomodorosCompleted,
        settings,
        start,
        pause,
        reset,
        skip,
        updateSettings,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
}
