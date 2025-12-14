import type { CardResponse } from '@/types/interfaces';

export const isEmptyResponse = (data: unknown): boolean => {
  return !data || (typeof data === 'object' && Object.keys(data).length === 0) || data === null;
};

export const isValidCardsResponse = (
  data: unknown
): data is { results?: CardResponse[]; total?: number; total_pages?: number } | CardResponse[] => {
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

export const isValidCardDetailData = (data: unknown): data is CardResponse => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return (
    'id' in data &&
    typeof data.id === 'string' &&
    'description' in data &&
    (typeof data.description === 'string' || data.description === null) &&
    'alt_description' in data &&
    (typeof data.alt_description === 'string' || data.alt_description === null) &&
    'urls' in data &&
    typeof data.urls === 'object' &&
    data.urls !== null &&
    'links' in data &&
    typeof data.links === 'object' &&
    data.links !== null &&
    'likes' in data &&
    typeof data.likes === 'number' &&
    'user' in data &&
    typeof data.user === 'object' &&
    data.user !== null
  );
};
