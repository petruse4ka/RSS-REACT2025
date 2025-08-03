import { fetchCardDetails } from '@/api/fetch-card-details';
import { en } from '@/locale/en';
import { FETCH_ERRORS } from '@/constants';

test('fetchCardDetails returns mock data for valid card ID', async () => {
  const cardDetail = await fetchCardDetails('IPtSV340-j4', en);

  expect(cardDetail).toBeDefined();
  expect(cardDetail).toHaveProperty('id');
  expect(cardDetail).toHaveProperty('imageUrl');
  expect(cardDetail).toHaveProperty('title');
  expect(cardDetail).toHaveProperty('description');
  expect(cardDetail).toHaveProperty('author');
  expect(cardDetail).toHaveProperty('stats');
  expect(cardDetail).toHaveProperty('links');

  expect(cardDetail.id).toBe('IPtSV340-j4');
  expect(cardDetail.author.name).toBe('NEOM');
  expect(cardDetail.author.username).toBe('neom');
  expect(cardDetail.stats.likes).toBe(33333);
  expect(cardDetail.stats.downloads).toBe(11111);
  expect(cardDetail.stats.views).toBe(4444444);
});

test('fetchCardDetails throws error when API returns error 403', async () => {
  await expect(fetchCardDetails('simulated-error-403', en)).rejects.toThrow(
    FETCH_ERRORS.HTTP_ERROR + ' 403'
  );
});

test('fetchCardDetails throws error when API returns error 404', async () => {
  await expect(fetchCardDetails('non-existent-id', en)).rejects.toThrow(
    FETCH_ERRORS.HTTP_ERROR + ' 404'
  );
});
