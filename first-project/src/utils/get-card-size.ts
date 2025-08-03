import { CARD_SIZES } from '@/constants';

export const getCardSize = (index: number): string => {
  return CARD_SIZES[index % CARD_SIZES.length];
};
