import type { CountryListItem } from '@/types/interfaces';
import useMainTableFields from '@/hooks/use-main-table-fields';
import useAdditionalTableFields from '@/hooks/use-additional-table-fields';
import { useLocale } from '@/hooks/use-locale';
import CountryItem from './item';

type Props = {
  data: CountryListItem[];
};

export default function CountryList({ data }: Props) {
  const mainTableFields = useMainTableFields();
  const additionalTableFields = useAdditionalTableFields();
  const translations = useLocale();

  if (data.length === 0) {
    return (
      <div className="text-shamrock-400 dark:text-scooter-400 py-8 text-center text-xl">
        <p>{translations.table.noCountryData}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full rounded-lg">
        <thead className="border-scooter-400 dark:border-shamrock-400 border-b">
          <tr>
            <th className="px-6 py-4 text-left text-xs tracking-wider whitespace-nowrap text-zinc-700 uppercase dark:text-zinc-50">
              {translations.tableFields.country}
            </th>
            <th className="px-6 py-4 text-left text-xs tracking-wider whitespace-nowrap text-zinc-700 uppercase dark:text-zinc-50">
              {translations.tableFields.isoCode}
            </th>
            {mainTableFields.map((field) => (
              <th
                key={field.key}
                className="px-6 py-4 text-left text-xs tracking-wider whitespace-nowrap text-zinc-700 uppercase dark:text-zinc-50"
              >
                {field.label}
              </th>
            ))}
            {additionalTableFields.map((field) => (
              <th
                key={field.key}
                className="mb-5 px-6 py-4 text-left text-xs tracking-wider whitespace-nowrap text-zinc-700 uppercase dark:text-zinc-50"
              >
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-scooter-400 dark:divide-shamrock-400 divide-y">
          {data.map((country) => (
            <CountryItem
              key={`${country.name}-${country.year}`}
              country={country}
              mainTableFields={mainTableFields}
              additionalTableFields={additionalTableFields}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
