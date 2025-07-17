import { fetchCards } from '@/api/fetch-cards';

test('fetchCards returns mock data for default search', async () => {
  const defaultCards = await fetchCards('');

  expect(defaultCards).toBeDefined();
  expect(Array.isArray(defaultCards)).toBe(true);
  expect(defaultCards.length).toBeGreaterThan(0);

  const firstCard = defaultCards[0];
  expect(firstCard).toHaveProperty('id');
  expect(firstCard).toHaveProperty('imageUrl');
  expect(firstCard).toHaveProperty('title');
  expect(firstCard).toHaveProperty('description');
});

test('fetchCards returns mock cards for search query', async () => {
  const cards = await fetchCards('random-search-query');

  expect(cards).toBeDefined();
  expect(Array.isArray(cards)).toBe(true);
  expect(cards.length).toBeGreaterThan(0);

  const cardIds = cards.map((card) => card.id);
  const cardDescriptions = cards.map((card) => card.description);
  const cardTitles = cards.map((card) => card.title);

  expect(cardIds).toContain('IPtSV340-j4');
  expect(cardDescriptions).toContain('Author: NEOM (@neom)');
  expect(cardTitles).toContain('A MAN WALKING DOWN A DIRT ROAD NEXT TO A MOUNTAIN');

  cards.forEach((card) => {
    expect(card).toHaveProperty('id');
    expect(card).toHaveProperty('imageUrl');
    expect(card).toHaveProperty('title');
    expect(card).toHaveProperty('description');
  });
});

test('fetchCards returns correct data structure', async () => {
  const cards = await fetchCards('random-search-query');

  expect(cards).toBeDefined();
  expect(Array.isArray(cards)).toBe(true);
  expect(cards.length).toBeGreaterThan(0);
});

test('fetchCards throws error when API returns error 404', async () => {
  await expect(fetchCards('simulated-error-404')).rejects.toThrow('HTTP error: 404');
});

test('fetchCards throws error when API returns error 500', async () => {
  await expect(fetchCards('simulated-error-500')).rejects.toThrow('HTTP error: 500');
});

test('fetchCards throws error when API returns empty response', async () => {
  await expect(fetchCards('simulated-empty-response')).rejects.toThrow('Empty response from API');
});

test('fetchCards throws error when API returns invalid data', async () => {
  await expect(fetchCards('simulated-invalid-data')).rejects.toThrow(
    'Invalid response structure from API'
  );
});
