import { useState, useEffect } from 'react';
import type { CountryListItem } from '../types/interfaces';
import fetchEmissionsData from '../services/fetch-emmission-data';
import transformEmissionsData from '../services/transform-emmission-data';
import CountryList from '../components/country-list/list';
import { useLocale } from '../hooks/use-locale';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<CountryListItem[]>([]);
  const selectedYear = 2020;
  const translation = useLocale();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchEmissionsData();
        const transformedData = transformEmissionsData(data, selectedYear);
        setCountriesData(transformedData);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return isError ? (
    <div className="py-8 text-center">
      <div className="mb-4 text-red-500">{translation.table.error}</div>
    </div>
  ) : isLoading ? (
    <div className="py-8 text-center">
      <div className="mb-4 text-gray-500">{translation.table.loader}</div>
    </div>
  ) : (
    <div className="mx-auto w-full space-y-6">
      <h2 className="text-scooter-400 dark:text-shamrock-400 mb-2 text-center text-3xl font-bold">
        {translation.homepage.title}
      </h2>

      <div className="border-scooter-400 dark:border-shamrock-400 mt-10 rounded-lg border p-6">
        <CountryList data={countriesData} />

        {
          <div className="text-scooter-400 dark:text-shamrock-400 mt-4 text-sm">
            {countriesData.length} {translation.table.countries} {selectedYear}
          </div>
        }
      </div>
    </div>
  );
}
