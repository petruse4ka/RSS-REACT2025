import { useLocale } from '@/hooks/use-locale';
import { useState, useCallback } from 'react';
import type { MouseEvent, ChangeEvent } from 'react';
import Select from '@/components/ui/select';
import Input from '@/components/ui/input';
import Tooltip from '@/components/ui/tooltip';
import Modal from '@/components/ui/modal';
import Button from '@/components/ui/button';
import ColumnSelectionForm from './column-selection-form';
import type { CountryTableItem, TableField } from '@/types/interfaces';
import type { SortField, SortDirection } from '@/types/types';

type Props = {
  data: CountryTableItem[];
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
  const [modalState, setModalState] = useState<boolean>(false);

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

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    [onSearchChange]
  );

  const handleYearChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onYearChange(Number(event.target.value));
    },
    [onYearChange]
  );

  const handleMouseEnter = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({
      left: rect.left,
      top: rect.top + rect.height,
    });
    setShowTooltip(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  const handleModalOpen = useCallback(() => {
    setModalState(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalState(false);
  }, []);

  return (
    <div className="mb-6 space-y-4">
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={handleModalOpen}
          className="bg-scooter-400 hover:bg-scooter-500 dark:bg-shamrock-400 dark:hover:bg-shamrock-500 px-4 py-2 text-white"
          text={translations.controls.selectFields}
        />
      </div>
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
          <div className="relative">
            <Input
              id="country-search"
              list="country-suggestions"
              placeholder={translations.controls.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="dark:hover:border-scooter-400 hover:border-shamrock-400 focus:border-scooter-500 dark:focus:border-scooter-500 w-full border-zinc-300 bg-zinc-100 pr-15 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
            />
            {searchQuery && (
              <Button
                onClick={() => onSearchChange('')}
                className="text-scooter-400 hover:text-scooter-600 dark:text-shamrock-400 dark:hover:text-shamrock-600 absolute top-1/2 right-5 z-1 -translate-y-1/2 bg-zinc-100 px-2 sm:px-2 dark:bg-zinc-900"
                text="×"
              />
            )}
          </div>
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
      <Modal
        isOpen={modalState}
        onClose={handleModalClose}
        title={translations.controls.selectFields}
      >
        <ColumnSelectionForm onClose={handleModalClose} />
      </Modal>
    </div>
  );
}
