import { getDefaultTheme } from '@/utils/get-default-theme';

test('getDefaultTheme returns dark when system prefers dark', () => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
    })),
    writable: true,
  });

  const result = getDefaultTheme();
  expect(result).toBe('dark');
});

test('getDefaultTheme returns light when system prefers light', () => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation((query) => ({
      matches: query === 'light',
    })),
    writable: true,
  });

  const result = getDefaultTheme();
  expect(result).toBe('light');
});
