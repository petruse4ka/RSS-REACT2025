import getSliderPosition from '@/utils/get-slider-position';

test('returns left-0 for strength 0', () => {
  const result = getSliderPosition(0);
  expect(result).toBe('left-0');
});

test('returns left-[20%] for strength 1', () => {
  const result = getSliderPosition(1);
  expect(result).toBe('left-[20%]');
});

test('returns left-[40%] for strength 2', () => {
  const result = getSliderPosition(2);
  expect(result).toBe('left-[40%]');
});

test('returns left-[60%] for strength 3', () => {
  const result = getSliderPosition(3);
  expect(result).toBe('left-[60%]');
});

test('returns left-[80%] for strength 4', () => {
  const result = getSliderPosition(4);
  expect(result).toBe('left-[80%]');
});

test('returns left-[99%] for strength 5', () => {
  const result = getSliderPosition(5);
  expect(result).toBe('left-[99%]');
});

test('returns left-0 for unknown strength', () => {
  const result = getSliderPosition(99);
  expect(result).toBe('left-0');
});

test('returns left-0 for negative strength', () => {
  const result = getSliderPosition(-1);
  expect(result).toBe('left-0');
});
