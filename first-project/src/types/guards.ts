import type { CardResponse } from '@/types/interfaces';

export const isEmptyResponse = (data: unknown): boolean => {
  return !data || (typeof data === 'object' && Object.keys(data).length === 0) || data === null;
};

export const isValidApiResponse = (
  data: unknown
): data is { results?: CardResponse[] } | CardResponse[] => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return ('results' in data && Array.isArray(data.results)) || Array.isArray(data);
};

export const isValidCardsData = (data: unknown): data is CardResponse[] => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (card) =>
        card.user &&
        typeof card.user === 'object' &&
        (typeof card.user.name === 'string' || card.user.name === null) &&
        (typeof card.user.username === 'string' || card.user.username === null) &&
        typeof card.id === 'string' &&
        (typeof card.alt_description === 'string' || card.alt_description === null) &&
        typeof card.urls === 'object' &&
        (typeof card.urls.regular === 'string' || card.urls.regular === null)
    )
  );
};
