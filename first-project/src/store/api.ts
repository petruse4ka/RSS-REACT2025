import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CardData, CardResponse, CardDetailResponse } from '@/types/interfaces';
import {
  UNSPLASH_API_KEY,
  UNSPLASH_BASE_URL,
  CARDS_PER_PAGE,
  DEFAULT_SEARCH_QUERY,
} from '@/constants';
import { isValidCardsResponse, isValidCardsData, isValidCardDetailData } from '@/types/guards';
import { FETCH_ERRORS } from '@/constants';
import defaultAvatar from '@/assets/icons/default-avatar.png';
import defaultImage from '@/assets/images/default-image.png';

export const api = createApi({
  reducerPath: 'unsplashApi',
  baseQuery: fetchBaseQuery({
    baseUrl: UNSPLASH_BASE_URL,
    timeout: 10000,
  }),
  tagTypes: ['Cards', 'CardDetails'],
  keepUnusedDataFor: 180,
  refetchOnReconnect: true,
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
      providesTags: (_result, _error, { searchQuery, page }) => [
        { type: 'Cards', id: `SEARCH_${searchQuery || DEFAULT_SEARCH_QUERY}_PAGE_${page}` },
      ],
      transformResponse: (response: unknown) => {
        if (!isValidCardsResponse(response)) {
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
    getCardDetails: builder.query<CardDetailResponse, { cardId: string }>({
      query: ({ cardId }) => {
        const urlParameters = new URLSearchParams({
          client_id: UNSPLASH_API_KEY,
        });

        return `/photos/${cardId}?${urlParameters.toString()}`;
      },
      providesTags: (_result, _error, { cardId }) => [{ type: 'CardDetails', id: cardId }],
      transformResponse: (response: unknown) => {
        if (!isValidCardDetailData(response)) {
          throw new Error(FETCH_ERRORS.INVALID_CARD_DETAIL_DATA);
        }

        const { id, urls, alt_description, description, user, likes, links, downloads, views } =
          response;

        const cardDetail: CardDetailResponse = {
          id: id,
          imageUrl: urls?.regular || defaultImage.src,
          title: (alt_description || '').toUpperCase(),
          description: description || '',
          author: {
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
            profileImage: user?.profile_image?.medium || defaultAvatar.src,
          },
          stats: {
            likes: likes || 0,
            downloads: downloads || 0,
            views: views || 0,
          },
          links: {
            html: links?.html || '',
          },
        };

        return cardDetail;
      },
    }),
  }),
});

export const { useGetCardsQuery, useGetCardDetailsQuery } = api;
export const { invalidateTags } = api.util;
