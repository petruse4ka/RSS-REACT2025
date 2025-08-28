import type { EmissionsData, CountryListItem } from '../types/interfaces';

export default function transformEmissionsData(
  data: EmissionsData,
  selectedYear: number
): CountryListItem[] {
  return Object.entries(data)
    .map(([countryName, countryData]) => {
      const yearData = countryData.data.find((item) => item.year === selectedYear);

      if (!yearData) {
        return null;
      }

      const { year, ...otherData } = yearData;
      return {
        name: countryName,
        iso_code: countryData.iso_code,
        year: year,
        ...otherData,
      };
    })
    .filter((item) => item !== null);
}
