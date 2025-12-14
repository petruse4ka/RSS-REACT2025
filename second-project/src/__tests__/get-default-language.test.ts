import getDefaultLanguage from '@/utils/get-default-language';

test('getDefaultLanguage returns ru for Russian browser language', () => {
  Object.defineProperty(navigator, 'language', {
    value: 'ru-RU',
    writable: true,
  });

  const result = getDefaultLanguage();
  expect(result).toBe('ru');
});

test('getDefaultLanguage returns en for English browser language', () => {
  Object.defineProperty(navigator, 'language', {
    value: 'en-US',
    writable: true,
  });

  const result = getDefaultLanguage();
  expect(result).toBe('en');
});

test('getDefaultLanguage returns en for other languages', () => {
  Object.defineProperty(navigator, 'language', {
    value: 'nl-NL',
    writable: true,
  });

  const result = getDefaultLanguage();
  expect(result).toBe('en');
});

test('getDefaultLanguage returns en for undefined languages', () => {
  Object.defineProperty(navigator, 'language', {
    value: undefined,
    writable: true,
  });

  const result = getDefaultLanguage();
  expect(result).toBe('en');
});

test('getDefaultLanguage returns en if window is undefined', () => {
  Object.defineProperty(global, 'window', {
    value: undefined,
    writable: true,
  });

  const result = getDefaultLanguage();
  expect(result).toBe('en');
});
