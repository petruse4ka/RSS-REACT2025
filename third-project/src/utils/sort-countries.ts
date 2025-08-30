import type { CountryTableItem, SortConfig } from '@/types/interfaces';

export function sortCountries(
  countries: CountryTableItem[],
  sortConfig: SortConfig
): CountryTableItem[] {
  const { field, direction } = sortConfig;

  return [...countries].sort((a, b) => {
    let comparison = 0;

    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else {
      const aNumber = typeof aValue === 'number' ? aValue : 0.001;
      const bNumber = typeof bValue === 'number' ? bValue : -0.001;
      comparison = aNumber - bNumber;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}
