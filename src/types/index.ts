// Tipos comuns
export type Route = {
  path: string;
  label: string;
  icon?: React.ComponentType;
};

// Tipos para Pomodoro
export type PomodoroMode = 'focus' | 'break';

export interface PomodoroSettings {
  focusDuration: number; // em minutos
  breakDuration: number; // em minutos
  autoStartBreak: boolean;
  autoStartFocus: boolean;
}

export interface PomodoroState {
  mode: PomodoroMode;
  timeLeft: number; // em segundos
  isRunning: boolean;
  settings: PomodoroSettings;
}

export type PomodoroLog = {
  id: string;
  startTime: Date;
  endTime: Date;
  mode: PomodoroMode;
  duration: number; // em segundos
}

export type PomodoroStats = {
  totalFocusTime: number; // em segundos
  totalBreakTime: number; // em segundos
  averageFocusTime: number; // em segundos
  averageBreakTime: number; // em segundos
}

// Tipos para Metas
export interface Goal {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de resposta da API
export type ApiResponse<T> = {
  data: T;
  error?: string;
  message?: string;
};

// Tipos de usuário
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
};

// Tipos de tema
export type Theme = 'light' | 'dark'; 