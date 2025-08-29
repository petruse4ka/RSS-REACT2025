import { useState, useEffect } from 'react';
import type { CountryTableItem, EmissionsData } from '../types/interfaces';
import fetchEmissionsData from '../services/fetch-emmission-data';
import transformEmissionsData from '../services/transform-emmission-data';
import EmissionTable from '../components/emission-table/table';
import { useLocale } from '../hooks/use-locale';
import getAvailableYears from '../utils/get-available-years';
import { TableSkeleton } from '../components/ui/skeleton';
import Button from '@/components/ui/button';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<EmissionsData>({});
  const [countriesAnnualData, setCountriesAnnualData] = useState<CountryTableItem[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2020);
  const translations = useLocale();

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

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="mx-auto w-full space-y-6">
      <h2 className="text-scooter-400 dark:text-shamrock-400 mb-2 text-center text-3xl font-bold">
        {translations.homepage.title}
      </h2>

      {isError ? (
        <div className="py-8 text-center">
          <div className="mb-4 text-red-500">{translations.table.error}</div>
          <Button
            onClick={handleRefresh}
            className="bg-scooter-500 hover:bg-scooter-400 dark:bg-shamrock-400 dark:hover:bg-shamrock-500 mt-8 text-white"
            text={translations.homepage.refresh}
          />
        </div>
      ) : isLoading ? (
        <div className="border-scooter-400 dark:border-shamrock-400 mt-10 rounded-lg border p-6">
          <TableSkeleton />
        </div>
      ) : (
        <div className="border-scooter-400 dark:border-shamrock-400 mt-10 rounded-lg border p-6">
          <EmissionTable
            data={countriesAnnualData}
            availableYears={availableYears}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
          />
        </div>
      )}
    </div>
  );
}
