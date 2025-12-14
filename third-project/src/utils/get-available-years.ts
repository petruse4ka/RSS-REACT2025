import type { EmissionsData } from '../types/interfaces';

export default function getAvailableYears(data: EmissionsData): number[] {
  const years = new Set<number>();

  Object.values(data).forEach((countryData) => {
    countryData.data.forEach((item) => {
      years.add(item.year);
    });
  });

  const sortedYears = Array.from(years).sort((a, b) => b - a);

  return sortedYears;
}
