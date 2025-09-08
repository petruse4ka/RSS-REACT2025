import { getPasswordStrength, getPasswordStrengthColor } from '@/utils/get-password-strength';

test('getPasswordStrength returns 0 for empty password', () => {
  const result = getPasswordStrength('');
  expect(result).toBe(0);
});

test('getPasswordStrength returns 1 for password with only numbers', () => {
  const result = getPasswordStrength('123456');
  expect(result).toBe(1);
});

test('getPasswordStrength returns 2 for password with numbers and lowercase letters', () => {
  const result = getPasswordStrength('123abc');
  expect(result).toBe(2);
});

test('getPasswordStrength returns 3 for password with numbers, lowercase and uppercase letters', () => {
  const result = getPasswordStrength('1acAC');
  expect(result).toBe(3);
});

test('getPasswordStrength returns 4 for password with numbers, letters and special symbols', () => {
  const result = getPasswordStrength('1abAB!');
  expect(result).toBe(4);
});

test('getPasswordStrength returns 5 for password with all criteria', () => {
  const result = getPasswordStrength('123abcABC!@#');
  expect(result).toBe(5);
});

test('getPasswordStrength returns 4 for password with all criteria but length < 8', () => {
  const result = getPasswordStrength('1aA!');
  expect(result).toBe(4);
});

test('getPasswordStrengthColor returns text-red-600 for strength 0', () => {
  const result = getPasswordStrengthColor(0);
  expect(result).toBe('text-red-600');
});

test('getPasswordStrengthColor returns text-red-500 for strength 1', () => {
  const result = getPasswordStrengthColor(1);
  expect(result).toBe('text-red-500');
});

test('getPasswordStrengthColor returns text-gray-500 for strength 2', () => {
  const result = getPasswordStrengthColor(2);
  expect(result).toBe('text-yellow-600');
});

test('getPasswordStrengthColor returns text-yellow-500 for strength 3', () => {
  const result = getPasswordStrengthColor(3);
  expect(result).toBe('text-yellow-500');
});

test('getPasswordStrengthColor returns text-green-500 for strength 4', () => {
  const result = getPasswordStrengthColor(4);
  expect(result).toBe('text-green-500');
});

test('getPasswordStrengthColor returns text-green-600 for strength 5', () => {
  const result = getPasswordStrengthColor(5);
  expect(result).toBe('text-green-600');
});

test('getPasswordStrengthColor returns text-gray-500 for unknown strength', () => {
  const result = getPasswordStrengthColor(99);
  expect(result).toBe('text-gray-500');
});
