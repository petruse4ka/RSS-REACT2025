import type { CountryListItem } from '@/types/interfaces';
import { useLocale } from '@/hooks/use-locale';
import formatNumber from '@/utils/format-number';

type Props = {
  country: CountryListItem;
  mainTableFields: { key: string; label: string }[];
  additionalTableFields: { key: string; label: string }[];
};

export default function CountryItem({ country, mainTableFields, additionalTableFields }: Props) {
  const translations = useLocale();

  const formatValue = (value: number | string | undefined): string => {
    if (typeof value !== 'number') {
      return translations.table.noData;
    }
    return formatNumber(value);
  };

  return (
    <tr
      className={`hover:bg-scooter-400 dark:hover:bg-shamrock-400 transition-colors duration-300`}
    >
      <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 dark:text-zinc-50">
        {country.name}
      </td>
      <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 dark:text-zinc-50">
        {country.iso_code}
      </td>
      {mainTableFields.map((field) => {
        const fieldValue = country[field.key];
        return (
          <td
            key={field.key}
            className="px-6 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 dark:text-zinc-50"
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
            className="px-6 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 dark:text-zinc-50"
          >
            {formatValue(fieldValue)}
          </td>
        );
      })}
    </tr>
  );
}
