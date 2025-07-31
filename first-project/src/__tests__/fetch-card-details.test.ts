import { fetchCardDetails } from '@/api/fetch-card-details';
import { useLocale } from '@/hooks/use-locale';
import { FETCH_ERRORS } from '@/constants';

test('fetchCardDetails returns mock data for valid card ID', async () => {
  const cardDetail = await fetchCardDetails('IPtSV340-j4', useLocale());

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
  expect(cardDetail.stats.likes).toBe(333);
  expect(cardDetail.stats.downloads).toBe(111);
  expect(cardDetail.stats.views).toBe(444);
});

test('fetchCardDetails throws error when API returns error 403', async () => {
  await expect(fetchCardDetails('simulated-error-403', useLocale())).rejects.toThrow(
    FETCH_ERRORS.HTTP_ERROR + ' 403'
  );
});

test('fetchCardDetails throws error when API returns error 404', async () => {
  await expect(fetchCardDetails('non-existent-id', useLocale())).rejects.toThrow(
    FETCH_ERRORS.HTTP_ERROR + ' 404'
  );
});
