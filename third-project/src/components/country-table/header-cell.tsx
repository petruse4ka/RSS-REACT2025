import { useLocale } from '@/hooks/use-locale';
import type { SortField, SortDirection } from '@/types/types';

type Props = {
  field: SortField;
  label: string;
  currentSortField: SortField;
  currentSortDirection: SortDirection;
  onSort: (field: SortField) => void;
};

export default function TableHeaderCell({
  field,
  label,
  currentSortField,
  currentSortDirection,
  onSort,
}: Props) {
  const translations = useLocale();
  const isCurrentlySorted = currentSortField === field;

  const addSortArrow = () => {
    return (
      <span className="text-scooter-500 dark:text-shamrock-500 ml-2 w-2 font-bold">
        {isCurrentlySorted
          ? currentSortDirection === 'asc'
            ? translations.sorting.ascending
            : translations.sorting.descending
          : ''}
      </span>
    );
  };

  return (
    <th
      className="cursor-pointer px-6 py-4 text-left text-xs tracking-wider whitespace-nowrap text-zinc-700 uppercase transition-colors duration-300 select-none hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-700"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center">
        {label}
        {addSortArrow()}
      </div>
    </th>
  );
}
