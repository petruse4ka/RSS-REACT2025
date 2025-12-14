import { useLocale } from './use-locale';

export default function useMainTableFields() {
  const translations = useLocale();

  return [
    { key: 'year', label: translations.tableFields.year },
    { key: 'population', label: translations.tableFields.population },
    { key: 'co2', label: translations.tableFields.co2 },
    { key: 'co2_per_capita', label: translations.tableFields.co2PerCapita },
  ];
}
