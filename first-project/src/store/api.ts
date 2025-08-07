import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CardData, CardResponse } from '@/types/interfaces';
import {
  UNSPLASH_API_KEY,
  UNSPLASH_BASE_URL,
  CARDS_PER_PAGE,
  DEFAULT_SEARCH_QUERY,
} from '@/constants';
import { isValidApiResponse, isValidCardsData } from '@/types/guards';
import { FETCH_ERRORS } from '@/constants';

export const api = createApi({
  reducerPath: 'unsplashApi',
  baseQuery: fetchBaseQuery({
    baseUrl: UNSPLASH_BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
    timeout: 10000,
  }),
  tagTypes: ['Cards', 'CardDetails'],
  endpoints: (builder) => ({
    getCards: builder.query<
      { cards: CardData[]; total: number },
      { searchQuery: string; page: number }
    >({
      query: ({ searchQuery, page }) => {
        const urlParameters = new URLSearchParams({
          client_id: UNSPLASH_API_KEY,
          per_page: CARDS_PER_PAGE.toString(),
          page: page.toString(),
        });

        const path = searchQuery
          ? `/search/photos?query=${searchQuery}&${urlParameters.toString()}`
          : `/search/photos?query=${DEFAULT_SEARCH_QUERY}&${urlParameters.toString()}`;

        return path;
      },
      transformResponse: (response: unknown) => {
        if (!isValidApiResponse(response)) {
          throw new Error(FETCH_ERRORS.INVALID_RESPONSE_STRUCTURE);
        }

        const cardsData = 'results' in response ? response.results : response;

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

        const total =
          'total' in response && typeof response.total === 'number' ? response.total : cards.length;

        return { cards, total };
      },
    }),
  }),
});

export const { useGetCardsQuery } = api;
