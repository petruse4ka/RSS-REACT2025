import { useState, useCallback } from 'react';
import type { SortConfig, CountryTableItem } from '@/types/interfaces';
import type { SortField } from '@/types/types';
import { sortCountries } from '@/utils/sort-countries';

export function useSorting() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    direction: 'asc',
  });

  const handleSort = useCallback((field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const sortData = (data: CountryTableItem[]) => {
    return sortCountries(data, sortConfig);
  };

  return {
    sortConfig,
    handleSort,
    sortData,
  };
}
