import type { PasswordStrength } from '@/types/types';

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return '';

  let score = 0;
  if (/\d/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  if (password.length >= 8) score++;

  if (score < 3) return 'weak';
  if (score < 5) return 'medium';
  return 'strong';
};

export const getPasswordStrengthColor = (passwordStrength: PasswordStrength) => {
  switch (passwordStrength) {
    case 'weak':
      return 'text-red-500';
    case 'medium':
      return 'text-yellow-500';
    case 'strong':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};
