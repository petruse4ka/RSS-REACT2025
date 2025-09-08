import type { FormErrors } from './interfaces';

export function isFormField(field: unknown): field is keyof FormErrors {
  return Boolean(field && typeof field === 'string');
}
