import convertToBase64 from '@/utils/convert-to-base64';

test('convertToBase64 converts file to base64 string', async () => {
  const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

  const result = await convertToBase64(mockFile);

  expect(result).toBeDefined();
  expect(typeof result).toBe('string');
  expect(result).toMatch(/^data:text\/plain;base64,/);
});

test('convertToBase64 handles empty file', async () => {
  const mockFile = new File([''], 'empty.txt', { type: 'text/plain' });

  const result = await convertToBase64(mockFile);

  expect(result).toBeDefined();
  expect(typeof result).toBe('string');
  expect(result).toMatch(/^data:text\/plain;base64,/);
});

test('convertToBase64 handles image file', async () => {
  const mockImageFile = new File(['fake image data'], 'image.png', { type: 'image/png' });

  const result = await convertToBase64(mockImageFile);

  expect(result).toBeDefined();
  expect(typeof result).toBe('string');
  expect(result).toMatch(/^data:image\/png;base64,/);
});

test('convertToBase64 returns promise', () => {
  const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });

  const result = convertToBase64(mockFile);

  expect(result).toBeInstanceOf(Promise);
});
