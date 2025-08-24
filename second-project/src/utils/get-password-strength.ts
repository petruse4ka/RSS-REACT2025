export const getPasswordStrength = (password: string): number => {
  if (!password) return 0;

  let score = 0;
  if (/\d/.test(password)) score++;
  if (/[а-яa-z]/.test(password)) score++;
  if (/[А-ЯA-Z]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  if (password.length >= 8) score++;

  return score;
};

export const getPasswordStrengthColor = (passwordStrength: number) => {
  switch (passwordStrength) {
    case 0:
      return 'text-red-600';
    case 1:
      return 'text-red-500';
    case 2:
      return 'text-yellow-600';
    case 3:
      return 'text-yellow-500';
    case 4:
      return 'text-green-500';
    case 5:
      return 'text-green-600';
    default:
      return 'text-gray-500';
  }
};
