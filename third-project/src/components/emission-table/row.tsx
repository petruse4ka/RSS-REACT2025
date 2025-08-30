import type { CountryTableItem } from '@/types/interfaces';
import { useLocale } from '@/hooks/use-locale';
import formatNumber from '@/utils/format-number';
import type { FieldValue } from '@/types/types';
import type { TableField } from '@/types/interfaces';

type Props = {
  country: CountryTableItem;
  mainTableFields: TableField[];
  additionalTableFields: TableField[];
  previousYearData: CountryTableItem[];
  hasYearChanged: boolean;
  showHighlighting: boolean;
};

export default function CountryRow({
  country,
  mainTableFields,
  additionalTableFields,
  previousYearData,
  hasYearChanged,
  showHighlighting,
}: Props) {
  const translations = useLocale();

  const formatValue = (value: FieldValue): string => {
    if (typeof value !== 'number') {
      return translations.table.noData;
    }
    return formatNumber(value);
  };

  const getPreviousYearValue = (fieldKey: string): FieldValue => {
    const previousCountry = previousYearData.find(
      (currentCountry) => currentCountry.name === country.name
    );
    return previousCountry ? previousCountry[fieldKey] : undefined;
  };

  const isValueChanged = (fieldKey: string, currentValue: FieldValue): boolean => {
    if (!hasYearChanged || !showHighlighting) return false;
    const previousValue = getPreviousYearValue(fieldKey);
    return currentValue !== previousValue;
  };

  const getHighlightClass = (fieldKey: string, currentValue: FieldValue): string => {
    const hasChanged = isValueChanged(fieldKey, currentValue);
    return hasChanged ? 'animate-pulse bg-shamrock-500 dark:bg-scooter-500' : '';
  };

  return (
    <tr
      className={`hover:bg-scooter-400 dark:hover:bg-shamrock-400 group transition-colors duration-300`}
    >
      <td className="group-hover:bg-scooter-400 dark:group-hover:bg-shamrock-400 sticky left-0 bg-zinc-100 px-2 py-4 text-sm text-zinc-700 transition-colors duration-300 sm:px-6 lg:whitespace-nowrap dark:bg-zinc-900 dark:text-zinc-50">
        {country.name}
      </td>
      <td className="px-2 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 sm:px-6 dark:text-zinc-50">
        {country.iso_code || translations.table.noData}
      </td>
      {mainTableFields.map((field) => {
        const fieldValue = country[field.key];
        return (
          <td
            key={field.key}
            className={`px-2 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 sm:px-6 dark:text-zinc-50 ${getHighlightClass(field.key, fieldValue)}`}
          >
            {formatValue(fieldValue)}
          </td>
        );
      })}
      {additionalTableFields.map((field) => {
        const fieldValue = country[field.key];
        return (
          <td
            key={field.key}
            className={`px-2 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 sm:px-6 dark:text-zinc-50 ${getHighlightClass(field.key, fieldValue)}`}
          >
            {formatValue(fieldValue)}
          </td>
        );
      })}
    </tr>
  );
}
