import { useState, useMemo } from 'react';
import type { CountryTableItem } from '@/types/interfaces';
import useMainTableFields from '@/hooks/use-main-table-fields';
import useAdditionalTableFields from '@/hooks/use-additional-table-fields';
import { useColumnSelectionStore } from '@/store/column-selection-store';
import { useLocale } from '@/hooks/use-locale';
import { useSorting } from '@/hooks/use-sorting';
import CountryRow from './row';
import TableHeader from './header';
import TableControls from './controls';
import { Profiler } from 'react';

type Props = {
  data: CountryTableItem[];
  availableYears: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  previousYearData: CountryTableItem[];
  hasYearChanged: boolean;
  showHighlighting: boolean;
};

export default function EmissionTable({
  data,
  availableYears,
  selectedYear,
  onYearChange,
  previousYearData,
  hasYearChanged,
  showHighlighting,
}: Props) {
  const mainTableFields = useMainTableFields();
  const allAdditionalFields = useAdditionalTableFields();
  const { selectedFields } = useColumnSelectionStore();
  const translations = useLocale();
  const { sortConfig, handleSort, sortData } = useSorting();
  const [searchQuery, setSearchQuery] = useState('');

  const additionalTableFields = useMemo(
    () => allAdditionalFields.filter((field) => selectedFields.includes(field.key)),
    [allAdditionalFields, selectedFields]
  );

  const hasDataForYear = useMemo(
    () => (country: CountryTableItem) => country.year === selectedYear,
    [selectedYear]
  );

  const isCountryMatch = useMemo(
    () => (country: CountryTableItem) => {
      if (!searchQuery) return true;
      return country.name.toLowerCase().includes(searchQuery.toLowerCase());
    },
    [searchQuery]
  );

  const filteredData = useMemo(
    () => data.filter((country) => hasDataForYear(country) && isCountryMatch(country)),
    [data, hasDataForYear, isCountryMatch]
  );

  const sortedCountries = useMemo(() => sortData(filteredData), [filteredData, sortData]);

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
                  <CountryRow
                    key={`${country.name}-${country.year}`}
                    country={country}
                    mainTableFields={mainTableFields}
                    additionalTableFields={additionalTableFields}
                    previousYearData={previousYearData}
                    hasYearChanged={hasYearChanged}
                    showHighlighting={showHighlighting}
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
