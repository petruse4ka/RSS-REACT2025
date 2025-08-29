import { useState, useEffect } from 'react';
import type { CountryListItem, EmissionsData } from '../types/interfaces';
import fetchEmissionsData from '../services/fetch-emmission-data';
import transformEmissionsData from '../services/transform-emmission-data';
import CountryList from '../components/country-table/table';
import { useLocale } from '../hooks/use-locale';
import getAvailableYears from '../utils/get-available-years';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<EmissionsData>({});
  const [countriesAnnualData, setCountriesAnnualData] = useState<CountryListItem[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2020);
  const translation = useLocale();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchEmissionsData();
        setCountriesData(data);

        const years = getAvailableYears(data);
        setAvailableYears(years);

        if (years.length > 0) {
          const firstAvailableYear = years[0];
          setSelectedYear(firstAvailableYear);

          const transformedData = transformEmissionsData(data, firstAvailableYear);
          setCountriesAnnualData(transformedData);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (Object.keys(countriesData).length > 0) {
      const transformedData = transformEmissionsData(countriesData, selectedYear);
      setCountriesAnnualData(transformedData);
    }
  }, [selectedYear, countriesData]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

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
        <CountryList
          data={countriesAnnualData}
          availableYears={availableYears}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
      </div>
    </div>
  );
}
