import type { CardResponse, CardData } from '@/types/interfaces';
import {
  UNSPLASH_API_KEY,
  UNSPLASH_BASE_URL,
  CARDS_PER_PAGE,
  DEFAULT_SEARCH_QUERY,
  ERROR_TEXTS,
  CARD_DETAIL_TEXTS,
} from '@/constants';
import defaultImage from '@/assets/images/default-image.png';
import { isEmptyResponse, isValidCardsData, isValidApiResponse } from '@/types/guards';

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
    throw new Error(`${ERROR_TEXTS.HTTP_ERROR} ${response.status}`);
  }

  const data: unknown = await response.json();

  if (isEmptyResponse(data)) {
    throw new Error(ERROR_TEXTS.EMPTY_RESPONSE);
  }

  if (!isValidApiResponse(data)) {
    throw new Error(ERROR_TEXTS.INVALID_RESPONSE_STRUCTURE);
  }

  const cardsData = 'results' in data ? data.results : data;

  if (!isValidCardsData(cardsData)) {
    throw new Error(ERROR_TEXTS.INVALID_CARDS_DATA);
  }

  const cards: CardData[] = cardsData.map((card: CardResponse) => {
    const { id, urls, alt_description, user } = card;

    return {
      id: id,
      imageUrl: urls?.regular || defaultImage,
      title: (alt_description || CARD_DETAIL_TEXTS.UNTITLED).toUpperCase(),
      description: `${CARD_DETAIL_TEXTS.AUTHOR}: ${user?.name || CARD_DETAIL_TEXTS.UNKNOWN_AUTHOR_DISPLAY} (@${user?.username || CARD_DETAIL_TEXTS.UNKNOWN_USERNAME_DISPLAY})`,
    };
  });

  if ('total' in data && typeof data.total === 'number') {
    return { cards, total: data.total };
  }

  return { cards, total: cards.length };
};
