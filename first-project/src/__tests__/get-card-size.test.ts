import { getCardSize } from '@/utils/get-card-size';
import { CARD_SIZES } from '@/constants';

test('GetCardSize should return correct sizes for first 4 indices', () => {
  expect(getCardSize(0)).toBe(CARD_SIZES[0]);
  expect(getCardSize(1)).toBe(CARD_SIZES[1]);
  expect(getCardSize(2)).toBe(CARD_SIZES[2]);
  expect(getCardSize(3)).toBe(CARD_SIZES[3]);
});

test('GetCardSize should repeat the first size after the last one in the array', () => {
  expect(getCardSize(7)).toBe(CARD_SIZES[0]);
  expect(getCardSize(14)).toBe(CARD_SIZES[0]);
});
