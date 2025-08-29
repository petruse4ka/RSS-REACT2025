import { useState } from 'react';
import type { CountryListItem } from '@/types/interfaces';
import useMainTableFields from '@/hooks/use-main-table-fields';
import useAdditionalTableFields from '@/hooks/use-additional-table-fields';
import { useLocale } from '@/hooks/use-locale';
import { useSorting } from '@/hooks/use-sorting';
import CountryItem from './row';
import TableHeader from './header';
import TableControls from './controls';
import { Profiler } from 'react';

type Props = {
  data: CountryListItem[];
  availableYears: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
};

export default function CountryList({ data, availableYears, selectedYear, onYearChange }: Props) {
  const mainTableFields = useMainTableFields();
  const additionalTableFields = useAdditionalTableFields();
  const translations = useLocale();
  const { sortConfig, handleSort, sortData } = useSorting();
  const [searchQuery, setSearchQuery] = useState('');

  const hasDataForYear = (country: CountryListItem) => country.year === selectedYear;

  const isCountryMatch = (country: CountryListItem) => {
    if (!searchQuery) return true;
    return country.name.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filteredData = data.filter((country) => hasDataForYear(country) && isCountryMatch(country));

  const sortedCountries = sortData(filteredData);

  function onRender(
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
  }

  return (
    <Profiler id="CountriesList" onRender={onRender}>
      <div className="w-full">
        <TableControls
          data={data}
          availableYears={availableYears}
          selectedYear={selectedYear}
          onYearChange={onYearChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentSortField={sortConfig.field}
          currentSortDirection={sortConfig.direction}
          mainTableFields={mainTableFields}
          additionalTableFields={additionalTableFields}
        />

        {sortedCountries.length === 0 ? (
          <div className="text-shamrock-400 dark:text-shamrock-400 py-8 text-center text-xl">
            <p>
              {searchQuery ? translations.controls.noResults : translations.table.noCountryData}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-3">
            <table className="min-w-full rounded-lg">
              <TableHeader
                mainTableFields={mainTableFields}
                additionalTableFields={additionalTableFields}
                currentSortField={sortConfig.field}
                currentSortDirection={sortConfig.direction}
                onSort={handleSort}
              />
              <tbody className="divide-scooter-400 dark:divide-shamrock-400 divide-y">
                {sortedCountries.map((country) => (
                  <CountryItem
                    key={`${country.name}-${country.year}`}
                    country={country}
                    mainTableFields={mainTableFields}
                    additionalTableFields={additionalTableFields}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Profiler>
  );
}
