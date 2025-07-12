import type { CardResponse, CardData } from '@/types/interfaces';
import { UNSPLASH_API_KEY, UNSPLASH_BASE_URL, CARDS_PER_PAGE } from '@/constants';

export const fetchCards = async (
  searchQuery: string = '',
  page: number = 1
): Promise<CardData[]> => {
  const urlParameters = new URLSearchParams({
    client_id: UNSPLASH_API_KEY,
    per_page: CARDS_PER_PAGE.toString(),
    page: page.toString(),
  });

  const path = searchQuery
    ? `/search/photos?query=${searchQuery}&${urlParameters.toString()}`
    : `/photos?${urlParameters.toString()}`;

  const response = await fetch(`${UNSPLASH_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();

  const cardsData = data.results || data;

  const cards: CardData[] = cardsData.map((card: CardResponse) => {
    const { id, urls, alt_description, user } = card;

    return {
      id: id,
      imageUrl: urls.regular,
      title: alt_description.toUpperCase() || 'Untitled',
      description: `Author: ${user.name} (@${user.username})`,
    };
  });

  return cards;
};
