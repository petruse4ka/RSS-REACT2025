import type { CardResponse, CardData } from '@/types/interfaces';
import {
  UNSPLASH_API_KEY,
  UNSPLASH_BASE_URL,
  CARDS_PER_PAGE,
  DEFAULT_SEARCH_QUERY,
  FETCH_ERRORS,
} from '@/constants';
import defaultImage from '@/assets/images/default-image.png';
import { isEmptyResponse, isValidCardsData, isValidApiResponse } from '@/types/guards';
import type { Translations } from '@/locale';

export const fetchCards = async (
  searchQuery: string = '',
  page: number = 1,
  translations: Translations
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

  if (!isValidApiResponse(data)) {
    throw new Error(FETCH_ERRORS.INVALID_RESPONSE_STRUCTURE);
  }

  const cardsData = 'results' in data ? data.results : data;

  if (!isValidCardsData(cardsData)) {
    throw new Error(FETCH_ERRORS.INVALID_CARDS_DATA);
  }

  const cards: CardData[] = cardsData.map((card: CardResponse) => {
    const { id, urls, alt_description, user } = card;

    return {
      id: id,
      imageUrl: urls?.regular || defaultImage,
      title: (alt_description || translations.cardDetail.untitled).toUpperCase(),
      description: `${translations.cardDetail.author}: ${user?.name || translations.cardDetail.unknownAuthor} (@${user?.username || translations.cardDetail.unknownUsername})`,
    };
  });

  if ('total' in data && typeof data.total === 'number') {
    return { cards, total: data.total };
  }

  return { cards, total: cards.length };
};
