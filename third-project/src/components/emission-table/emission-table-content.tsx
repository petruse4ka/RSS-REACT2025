import { useState, useEffect, use } from 'react';
import type { CountryTableItem } from '@/types/interfaces';
import fetchEmissionsData from '@/services/fetch-emmission-data';
import transformEmissionsData from '@/services/transform-emmission-data';
import EmissionTable from '@/components/emission-table/table';
import getAvailableYears from '@/utils/get-available-years';
import { TableSkeleton } from '@/components/ui/skeleton';

const emissionsDataPromise = fetchEmissionsData();

export default function EmissionTableContent() {
  const countriesData = use(emissionsDataPromise);
  const [countriesAnnualData, setCountriesAnnualData] = useState<CountryTableItem[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2020);
  const [isDataProcessed, setIsDataProcessed] = useState(false);

  useEffect(() => {
    const parseData = async () => {
      const years = getAvailableYears(countriesData);
      setAvailableYears(years);

      if (years.length > 0) {
        const firstAvailableYear = years[0];
        setSelectedYear(firstAvailableYear);

        const transformedData = transformEmissionsData(countriesData, firstAvailableYear);
        setCountriesAnnualData(transformedData);
      }
      setIsDataProcessed(true);
    };
    parseData();
  }, [countriesData]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const transformedData = transformEmissionsData(countriesData, year);
    setCountriesAnnualData(transformedData);
  };

  return isDataProcessed ? (
    <div className="border-scooter-400 dark:border-shamrock-400 mt-10 rounded-lg border p-6">
      <EmissionTable
        data={countriesAnnualData}
        availableYears={availableYears}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />
    </div>
  ) : (
    <TableSkeleton />
  );
}
