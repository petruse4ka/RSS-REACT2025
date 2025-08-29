import { useLocale } from '@/hooks/use-locale';
import type { SortField, SortDirection } from '@/types/types';

type Props = {
  field: SortField;
  label: string;
  currentSortField: SortField;
  currentSortDirection: SortDirection;
  onSort: (field: SortField) => void;
  isSticky?: boolean;
};

export default function TableHeaderCell({
  field,
  label,
  currentSortField,
  currentSortDirection,
  onSort,
  isSticky = false,
}: Props) {
  const translations = useLocale();
  const isCurrentlySorted = currentSortField === field;

  const addSortArrow = () => {
    return (
      <span className="text-scooter-500 dark:text-shamrock-500 ml-2 w-2 font-bold group-hover:text-zinc-700 group-hover:dark:text-zinc-50">
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
      className={`dark:hover:bg-shamrock-400 hover:bg-scooter-400 group cursor-pointer px-6 py-4 text-left text-xs tracking-wider whitespace-nowrap text-zinc-700 uppercase select-none dark:text-zinc-50 ${
        isSticky ? 'sticky left-0 bg-zinc-100 dark:bg-zinc-900' : ''
      }`}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center">
        {label}
        {addSortArrow()}
      </div>
    </th>
  );
}
