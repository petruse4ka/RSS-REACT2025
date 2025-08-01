import { fetchCards } from '@/api/fetch-cards';
import { en } from '@/locale/en';
import { FETCH_ERRORS } from '@/constants';

test('fetchCards returns mock data for default search', async () => {
  const { cards: defaultCards, total } = await fetchCards('', 1, en);

  expect(defaultCards).toBeDefined();
  expect(Array.isArray(defaultCards)).toBe(true);
  expect(defaultCards.length).toBeGreaterThan(0);
  expect(typeof total).toBe('number');

  const firstCard = defaultCards[0];
  expect(firstCard).toHaveProperty('id');
  expect(firstCard).toHaveProperty('imageUrl');
  expect(firstCard).toHaveProperty('title');
  expect(firstCard).toHaveProperty('description');
});

test('fetchCards returns mock cards for search query', async () => {
  const { cards, total } = await fetchCards('random-search-query', 1, en);

  expect(cards).toBeDefined();
  expect(Array.isArray(cards)).toBe(true);
  expect(cards.length).toBeGreaterThan(0);
  expect(typeof total).toBe('number');

  const cardIds = cards.map((card) => card.id);
  const cardDescriptions = cards.map((card) => card.description);
  const cardTitles = cards.map((card) => card.title);

  expect(cardIds).toContain('IPtSV340-j4');
  expect(cardDescriptions).toContain(`${en.cardDetail.author}: NEOM (@neom)`);
  expect(cardTitles).toContain('A MAN WALKING DOWN A DIRT ROAD NEXT TO A MOUNTAIN');

  cards.forEach((card) => {
    expect(card).toHaveProperty('id');
    expect(card).toHaveProperty('imageUrl');
    expect(card).toHaveProperty('title');
    expect(card).toHaveProperty('description');
  });
});

test('fetchCards throws error when API returns error 404', async () => {
  await expect(fetchCards('simulated-error-404', 1, en)).rejects.toThrow(
    FETCH_ERRORS.HTTP_ERROR + ' 404'
  );
});

test('fetchCards throws error when API returns error 500', async () => {
  await expect(fetchCards('simulated-error-500', 1, en)).rejects.toThrow(
    FETCH_ERRORS.HTTP_ERROR + ' 500'
  );
});

test('fetchCards throws error when API returns empty response', async () => {
  await expect(fetchCards('simulated-empty-response', 1, en)).rejects.toThrow(
    FETCH_ERRORS.EMPTY_RESPONSE
  );
});

test('fetchCards throws error when API returns invalid data', async () => {
  await expect(fetchCards('simulated-invalid-data', 1, en)).rejects.toThrow(
    FETCH_ERRORS.INVALID_RESPONSE_STRUCTURE
  );
});
