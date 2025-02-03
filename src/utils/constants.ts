// Configurações do Pomodoro
export const POMODORO_SETTINGS = {
  DEFAULT_WORK_TIME: 25,
  DEFAULT_SHORT_BREAK: 5,
  DEFAULT_LONG_BREAK: 15,
  DEFAULT_SESSIONS_BEFORE_LONG_BREAK: 4,
  MIN_TIME: 1,
  MAX_TIME: 60,
};

// Configurações de Cores
export const COLORS = {
  PRIMARY: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  PRIORITY: {
    LOW: '#22c55e',
    MEDIUM: '#f59e0b',
    HIGH: '#ef4444',
  },
  STATUS: {
    TODO: '#6b7280',
    IN_PROGRESS: '#3b82f6',
    DONE: '#22c55e',
  },
  CATEGORY: {
    WORK: '#3b82f6',
    PERSONAL: '#8b5cf6',
    STUDY: '#22c55e',
    OTHER: '#6b7280',
  },
};

// Configurações de Notificações
export const NOTIFICATIONS = {
  POMODORO: {
    WORK_START: {
      TITLE: 'Hora de focar!',
      BODY: 'Sua sessão de trabalho começou.',
    },
    WORK_END: {
      TITLE: 'Hora de descansar!',
      BODY: 'Sua sessão de trabalho terminou.',
    },
    BREAK_START: {
      TITLE: 'Pausa iniciada',
      BODY: 'Aproveite seu tempo de descanso.',
    },
    BREAK_END: {
      TITLE: 'Pausa terminada',
      BODY: 'Hora de voltar ao trabalho.',
    },
  },
};

// Configurações de Armazenamento Local
export const STORAGE_KEYS = {
  THEME: 'theme',
  POMODORO_SETTINGS: 'pomodoro_settings',
  GOALS: 'goals',
  NOTES: 'notes',
  CALENDAR_EVENTS: 'calendar_events',
};

// Configurações de Validação
export const VALIDATION = {
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_TAGS: 5,
};

// Configurações de Paginação
export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  MAX_PAGES_SHOWN: 5,
};

// Configurações de Layout
export const LAYOUT = {
  SIDEBAR_WIDTH: '280px',
  HEADER_HEIGHT: '64px',
  CONTENT_MAX_WIDTH: '1200px',
};

// Configurações de Animação
export const ANIMATION = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  },
};
