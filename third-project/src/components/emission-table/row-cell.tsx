import { useLocale } from '@/hooks/use-locale';
import formatNumber from '@/utils/format-number';
import type { FieldValue } from '@/types/types';

type Props = {
  value: FieldValue;
  previousValue: FieldValue;
  hasYearChanged: boolean;
  showHighlighting: boolean;
  isSticky?: boolean;
};

export default function RowCell({
  value,
  previousValue,
  hasYearChanged,
  showHighlighting,
  isSticky = false,
}: Props) {
  const translations = useLocale();

  const formatValue = (value: FieldValue): string => {
    if (value === undefined) {
      return translations.table.noData;
    }
    if (typeof value === 'string') {
      return value || translations.table.noData;
    }
    if (typeof value === 'number') {
      return formatNumber(value);
    }
    return translations.table.noData;
  };

  const isValueChanged = (): boolean => {
    if (!hasYearChanged || !showHighlighting) return false;
    return value !== previousValue;
  };

  const getHighlightClass = (): string => {
    const hasChanged = isValueChanged();
    return hasChanged ? 'animate-pulse bg-shamrock-500 dark:bg-scooter-500' : '';
  };

  const defaultClasses =
    'px-2 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 sm:px-6 dark:text-zinc-50';
  const stickyClasses = isSticky
    ? 'sticky left-0 bg-zinc-100 lg:whitespace-nowrap dark:bg-zinc-900'
    : '';
  const highlightClasses = getHighlightClass();

  return (
    <td className={`${defaultClasses} ${stickyClasses} ${highlightClasses}`}>
      {formatValue(value)}
    </td>
  );
}
