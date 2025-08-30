import type { CountryTableItem } from '@/types/interfaces';
import { useLocale } from '@/hooks/use-locale';
import formatNumber from '@/utils/format-number';

type Props = {
  country: CountryTableItem;
  mainTableFields: { key: string; label: string }[];
  additionalTableFields: { key: string; label: string }[];
};

export default function CountryRow({ country, mainTableFields, additionalTableFields }: Props) {
  const translations = useLocale();

  const formatValue = (value: number | string | undefined): string => {
    if (typeof value !== 'number') {
      return translations.table.noData;
    }
    return formatNumber(value);
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
            className="px-2 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 sm:px-6 dark:text-zinc-50"
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
            className="px-2 py-4 text-sm whitespace-nowrap text-zinc-700 transition-colors duration-300 sm:px-6 dark:text-zinc-50"
          >
            {formatValue(fieldValue)}
          </td>
        );
      })}
    </tr>
  );
}
