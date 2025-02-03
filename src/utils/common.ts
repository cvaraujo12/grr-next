export function formatDate(date: Date | string): string {
  try {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    // Usar toLocaleDateString pode causar problemas de hidratação
    // devido a diferenças de localização entre servidor e cliente
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.warn('Error formatting date:', error);
    return '';
  }
}

export function formatDateTime(date: Date | string): string {
  try {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    // Usar formato consistente para evitar problemas de hidratação
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (error) {
    console.warn('Error formatting datetime:', error);
    return '';
  }
}

export function formatTime(date: Date | string): string {
  try {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    // Usar formato consistente para evitar problemas de hidratação
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  } catch (error) {
    console.warn('Error formatting time:', error);
    return '';
  }
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const value = String(item[key]);
    return {
      ...groups,
      [value]: [...(groups[value] || []), item],
    };
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    return order === 'asc'
      ? aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      : aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
  });
}

export function filterBy<T>(array: T[], key: keyof T, value: unknown): T[] {
  return array.filter(item => item[key] === value);
}

export function searchBy<T>(array: T[], key: keyof T, query: string): T[] {
  const normalizedQuery = query.toLowerCase().trim();
  return array.filter(item => {
    const value = String(item[key]).toLowerCase();
    return value.includes(normalizedQuery);
  });
}
