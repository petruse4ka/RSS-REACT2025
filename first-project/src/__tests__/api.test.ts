import { test, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/store/api';
import { server } from './mocks/node';
import { http, HttpResponse } from 'msw';
import { DEFAULT_SEARCH_QUERY, FETCH_ERRORS } from '@/constants';
import { mockCards } from './mocks/handlers';

const createTestStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
};

test('RTK Query should use DEFAULT_SEARCH_QUERY when searchQuery is empty', async () => {
  const mockResponse = {
    results: mockCards,
    total: 90,
    total_pages: 3,
  };

  server.use(
    http.get('https://api.unsplash.com/search/photos', ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get('query');

      expect(query).toBe(DEFAULT_SEARCH_QUERY);

      return HttpResponse.json(mockResponse);
    })
  );

  const store = createTestStore();
  const result = store.dispatch(api.endpoints.getCards.initiate({ searchQuery: '', page: 1 }));
  const response = await result.unwrap();

  expect(response.cards).toHaveLength(mockCards.length);
  expect(response.total).toBe(90);
});

test('RTK Query throws error when API returns invalid response structure', async () => {
  server.use(
    http.get('https://api.unsplash.com/search/photos', () => {
      return HttpResponse.json({
        invalid: 'structure',
        noResults: 'property',
      });
    })
  );

  const store = createTestStore();
  const result = store.dispatch(api.endpoints.getCards.initiate({ searchQuery: 'test', page: 1 }));

  await expect(result.unwrap()).rejects.toThrow(FETCH_ERRORS.INVALID_RESPONSE_STRUCTURE);
});

test('RTK Query throws error when API returns invalid cards data', async () => {
  server.use(
    http.get('https://api.unsplash.com/search/photos', () => {
      return HttpResponse.json({
        results: [{ invalid: 'card', structure: 'missing required fields' }],
        total: 1,
      });
    })
  );

  const store = createTestStore();
  const result = store.dispatch(api.endpoints.getCards.initiate({ searchQuery: 'test', page: 1 }));

  await expect(result.unwrap()).rejects.toThrow(FETCH_ERRORS.INVALID_RESPONSE_STRUCTURE);
});

test('RTK Query throws error when getCardDetails returns invalid card detail data', async () => {
  server.use(
    http.get('https://api.unsplash.com/photos/:id', () => {
      return HttpResponse.json({
        invalid: 'card detail structure',
        missing: 'required fields',
      });
    })
  );

  const store = createTestStore();
  const result = store.dispatch(api.endpoints.getCardDetails.initiate({ cardId: 'test-id' }));

  await expect(result.unwrap()).rejects.toThrow(FETCH_ERRORS.INVALID_CARD_DETAIL_DATA);
});
