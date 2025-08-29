import { useLocale } from '@/hooks/use-locale';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import Select from '@/components/ui/select';
import Input from '@/components/ui/input';
import Tooltip from '@/components/ui/tooltip';

import type { CountryListItem, TableField } from '@/types/interfaces';
import type { SortField, SortDirection } from '@/types/types';
import type { ChangeEvent } from 'react';

type Props = {
  data: CountryListItem[];
  availableYears: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentSortField: SortField;
  currentSortDirection: SortDirection;
  mainTableFields: TableField[];
  additionalTableFields: TableField[];
};

export default function TableControls({
  data,
  availableYears,
  selectedYear,
  onYearChange,
  searchQuery,
  onSearchChange,
  currentSortField,
  currentSortDirection,
  mainTableFields,
  additionalTableFields,
}: Props) {
  const translations = useLocale();

  const countryNames = new Set<string>();
  data.forEach((country) => {
    if (country.name) {
      countryNames.add(country.name);
    }
  });
  const countryNamesAutocomplete = Array.from(countryNames).sort();

  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0 });

  const getSortingLabel = (fieldKey: string): string => {
    if (fieldKey === 'name') return translations.tableFields.country;
    if (fieldKey === 'iso_code') return translations.tableFields.isoCode;

    const mainField = mainTableFields.find((field) => field.key === fieldKey);
    if (mainField) return mainField.label;

    const additionalField = additionalTableFields.find((field) => field.key === fieldKey);
    if (additionalField) return additionalField.label;

    return fieldKey;
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onYearChange(Number(event.target.value));
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({
      left: rect.left,
      top: rect.top + rect.height,
    });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="year-selector" className="block text-sm text-zinc-700 dark:text-zinc-300">
            {translations.controls.yearSelector}
          </label>
          <Select
            id="year-selector"
            value={selectedYear.toString()}
            onChange={handleYearChange}
            className="dark:hover:border-scooter-400 hover:border-shamrock-400 focus:border-scooter-500 dark:focus:border-shamrock-500 w-full border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="country-search"
            className="block text-sm text-zinc-700 dark:text-zinc-300"
          >
            {translations.controls.search}
          </label>
          <Input
            id="country-search"
            list="country-suggestions"
            placeholder={translations.controls.searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="dark:hover:border-scooter-400 hover:border-shamrock-400 focus:border-scooter-500 dark:focus:border-shamrock-500 w-full border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <datalist id="country-suggestions">
            {countryNamesAutocomplete.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="space-y-2">
          <label
            htmlFor="current-sorting"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {translations.controls.currentSorting}
          </label>
          <Input
            id="current-sorting"
            value={`${getSortingLabel(currentSortField)} ${currentSortDirection === 'asc' ? translations.sorting.ascending : translations.sorting.descending}`}
            className="w-full cursor-not-allowed border-zinc-300 bg-zinc-200 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            readOnly
          />
        </div>
      </div>

      {showTooltip && <Tooltip coords={coords} text={translations.controls.sortingTooltip} />}
    </div>
  );
}
