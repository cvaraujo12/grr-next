import { VALIDATION } from './constants';

interface ValidationError {
  field: string;
  message: string;
}

export function validateRequired(value: unknown, fieldName: string): ValidationError | null {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return {
      field: fieldName,
      message: `${fieldName} é obrigatório`,
    };
  }
  return null;
}

export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string
): ValidationError | null {
  if (value.length < minLength) {
    return {
      field: fieldName,
      message: `${fieldName} deve ter pelo menos ${minLength} caracteres`,
    };
  }
  return null;
}

export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string
): ValidationError | null {
  if (value.length > maxLength) {
    return {
      field: fieldName,
      message: `${fieldName} deve ter no máximo ${maxLength} caracteres`,
    };
  }
  return null;
}

export function validateEmail(email: string): ValidationError | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      field: 'email',
      message: 'Email inválido',
    };
  }
  return null;
}

export function validateDate(date: string, fieldName: string): ValidationError | null {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return {
      field: fieldName,
      message: 'Data inválida',
    };
  }
  return null;
}

export function validateFutureDate(date: string, fieldName: string): ValidationError | null {
  const dateObj = new Date(date);
  const now = new Date();
  if (dateObj <= now) {
    return {
      field: fieldName,
      message: 'A data deve ser no futuro',
    };
  }
  return null;
}

export function validateArrayLength(
  array: unknown[],
  maxLength: number,
  fieldName: string
): ValidationError | null {
  if (array.length > maxLength) {
    return {
      field: fieldName,
      message: `${fieldName} deve ter no máximo ${maxLength} itens`,
    };
  }
  return null;
}

export function validateNumber(
  value: number,
  min: number,
  max: number,
  fieldName: string
): ValidationError | null {
  if (value < min || value > max) {
    return {
      field: fieldName,
      message: `${fieldName} deve estar entre ${min} e ${max}`,
    };
  }
  return null;
}

interface GoalValidation {
  title: string;
  description?: string;
  deadline?: string;
}

interface NoteValidation {
  title: string;
  content?: string;
  tags?: string[];
}

interface EventValidation {
  title: string;
  startDate: string;
  endDate: string;
}

export function validateGoal(values: GoalValidation): Record<string, string> {
  const errors: Record<string, string> = {};

  const titleError = validateRequired(values.title, 'Título');
  if (titleError) errors.title = titleError.message;

  const titleLengthError = validateMaxLength(values.title, VALIDATION.MAX_TITLE_LENGTH, 'Título');
  if (titleLengthError) errors.title = titleLengthError.message;

  if (values.description) {
    const descriptionLengthError = validateMaxLength(
      values.description,
      VALIDATION.MAX_DESCRIPTION_LENGTH,
      'Descrição'
    );
    if (descriptionLengthError) errors.description = descriptionLengthError.message;
  }

  if (values.deadline) {
    const dateError = validateDate(values.deadline, 'Data limite');
    if (dateError) errors.deadline = dateError.message;
  }

  return errors;
}

export function validateNote(values: NoteValidation): Record<string, string> {
  const errors: Record<string, string> = {};

  const titleError = validateRequired(values.title, 'Título');
  if (titleError) errors.title = titleError.message;

  const titleLengthError = validateMaxLength(values.title, VALIDATION.MAX_TITLE_LENGTH, 'Título');
  if (titleLengthError) errors.title = titleLengthError.message;

  if (values.content) {
    const contentLengthError = validateMaxLength(
      values.content,
      VALIDATION.MAX_DESCRIPTION_LENGTH,
      'Conteúdo'
    );
    if (contentLengthError) errors.content = contentLengthError.message;
  }

  if (values.tags) {
    const tagsLengthError = validateArrayLength(values.tags, VALIDATION.MAX_TAGS, 'Tags');
    if (tagsLengthError) errors.tags = tagsLengthError.message;
  }

  return errors;
}

export function validateEvent(values: EventValidation): Record<string, string> {
  const errors: Record<string, string> = {};

  const titleError = validateRequired(values.title, 'Título');
  if (titleError) errors.title = titleError.message;

  const titleLengthError = validateMaxLength(values.title, VALIDATION.MAX_TITLE_LENGTH, 'Título');
  if (titleLengthError) errors.title = titleLengthError.message;

  const startDateError = validateRequired(values.startDate, 'Data de início');
  if (startDateError) errors.startDate = startDateError.message;

  const endDateError = validateRequired(values.endDate, 'Data de término');
  if (endDateError) errors.endDate = endDateError.message;

  if (values.startDate && values.endDate) {
    const start = new Date(values.startDate);
    const end = new Date(values.endDate);
    if (end < start) {
      errors.endDate = 'A data de término deve ser posterior à data de início';
    }
  }

  return errors;
}
