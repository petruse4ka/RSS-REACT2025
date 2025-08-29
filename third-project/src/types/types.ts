import useMainTableFields from '@/hooks/use-main-table-fields';
import useAdditionalTableFields from '@/hooks/use-additional-table-fields';

type MainTableFieldKeys = ReturnType<typeof useMainTableFields>[number]['key'];
type AdditionalTableFieldKeys = ReturnType<typeof useAdditionalTableFields>[number]['key'];

export type SortField = 'name' | 'iso_code' | MainTableFieldKeys | AdditionalTableFieldKeys;

export type SortDirection = 'asc' | 'desc';

export type ColumnSelectionState = {
  selectedFields: string[];
  setSelectedFields: (fields: string[]) => void;
};
