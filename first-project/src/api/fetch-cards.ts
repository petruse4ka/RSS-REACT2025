import type { CardResponse, CardData } from '@/types/interfaces';
import {
  UNSPLASH_API_KEY,
  UNSPLASH_BASE_URL,
  CARDS_PER_PAGE,
  DEFAULT_SEARCH_QUERY,
  FETCH_ERRORS,
} from '@/constants';
import { isEmptyResponse, isValidCardsData, isValidCardsResponse } from '@/types/guards';

export const fetchCards = async (
  searchQuery: string = '',
  page: number = 1
): Promise<{ cards: CardData[]; total: number }> => {
  const urlParameters = new URLSearchParams({
    client_id: UNSPLASH_API_KEY,
    per_page: CARDS_PER_PAGE.toString(),
    page: page.toString(),
  });

  const path = searchQuery
    ? `/search/photos?query=${searchQuery}&${urlParameters.toString()}`
    : `/search/photos?query=${DEFAULT_SEARCH_QUERY}&${urlParameters.toString()}`;

  const response = await fetch(`${UNSPLASH_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`${FETCH_ERRORS.HTTP_ERROR} ${response.status}`);
  }

  const data: unknown = await response.json();

  if (isEmptyResponse(data)) {
    throw new Error(FETCH_ERRORS.EMPTY_RESPONSE);
  }

  if (!isValidCardsResponse(data)) {
    throw new Error(FETCH_ERRORS.INVALID_RESPONSE_STRUCTURE);
  }

  const cardsData = 'results' in data ? data.results : data;

  if (!isValidCardsData(cardsData)) {
    throw new Error(FETCH_ERRORS.INVALID_RESPONSE_STRUCTURE);
  }

  const cards: CardData[] = cardsData.map((card: CardResponse) => {
    const { id, urls, alt_description, user } = card;

    return {
      id: id,
      imageUrl: urls?.regular || '',
      title: (alt_description || '').toUpperCase(),
      description: `${user?.name || ''} (@${user?.username || ''})`,
    };
  });

  const total = 'total' in data && typeof data.total === 'number' ? data.total : cards.length;

  return { cards, total };
};
