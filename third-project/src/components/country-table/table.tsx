import type { CountryListItem } from '@/types/interfaces';
import useMainTableFields from '@/hooks/use-main-table-fields';
import useAdditionalTableFields from '@/hooks/use-additional-table-fields';
import { useLocale } from '@/hooks/use-locale';
import { useSorting } from '@/hooks/use-sorting';
import CountryItem from './row';
import TableHeader from './header';
import { Profiler } from 'react';

type Props = {
  data: CountryListItem[];
};

export default function CountryList({ data }: Props) {
  const mainTableFields = useMainTableFields();
  const additionalTableFields = useAdditionalTableFields();
  const translations = useLocale();
  const { sortConfig, handleSort, sortData } = useSorting();

  const sortedCountries = sortData(data);

  if (data.length === 0) {
    return (
      <div className="text-shamrock-400 dark:text-scooter-400 py-8 text-center text-xl">
        <p>{translations.table.noCountryData}</p>
      </div>
    );
  }

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
        <div className="overflow-x-auto">
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
      </div>
    </Profiler>
  );
}
