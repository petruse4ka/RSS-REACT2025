import { useState, use, useCallback } from 'react';
import type { CountryTableItem } from '@/types/interfaces';
import fetchEmissionsData from '@/services/fetch-emmission-data';
import transformEmissionsData from '@/services/transform-emmission-data';
import EmissionTable from '@/components/emission-table/table';

const emissionsDataPromise = fetchEmissionsData();

export default function EmissionTableContent() {
  const { countriesData, availableYears, firstCountriesAnnualData, firstSelectedYear } =
    use(emissionsDataPromise);
  const [countriesAnnualData, setCountriesAnnualData] =
    useState<CountryTableItem[]>(firstCountriesAnnualData);
  const [selectedYear, setSelectedYear] = useState<number>(firstSelectedYear);
  const [previousYearData, setPreviousYearData] = useState<CountryTableItem[]>([]);
  const [hasYearChanged, setHasYearChanged] = useState(false);
  const [showHighlighting, setShowHighlighting] = useState(false);

  const handleYearChange = useCallback(
    (year: number) => {
      setPreviousYearData(countriesAnnualData);
      setSelectedYear(year);

      const newTransformedData = transformEmissionsData(countriesData, year);
      setCountriesAnnualData(newTransformedData);

      setHasYearChanged(true);
      setShowHighlighting(true);

      setTimeout(() => {
        setShowHighlighting(false);
      }, 3000);
    },
    [countriesAnnualData, countriesData]
  );

  return (
    <div className="border-scooter-400 dark:border-shamrock-400 mt-10 rounded-lg border p-6">
      <EmissionTable
        data={countriesAnnualData}
        availableYears={availableYears}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        previousYearData={previousYearData}
        hasYearChanged={hasYearChanged}
        showHighlighting={showHighlighting}
      />
    </div>
  );
}
