import { memo } from 'react';
import type { CountryTableItem } from '@/types/interfaces';
import type { TableField } from '@/types/interfaces';
import RowCell from './row-cell';

type Props = {
  country: CountryTableItem;
  mainTableFields: TableField[];
  additionalTableFields: TableField[];
  previousYearData: CountryTableItem[];
  hasYearChanged: boolean;
  showHighlighting: boolean;
};

function CountryRow({
  country,
  mainTableFields,
  additionalTableFields,
  previousYearData,
  hasYearChanged,
  showHighlighting,
}: Props) {
  const getPreviousYearValue = (fieldKey: string) => {
    const previousCountry = previousYearData.find(
      (currentCountry) => currentCountry.name === country.name
    );
    return previousCountry ? previousCountry[fieldKey] : undefined;
  };

  return (
    <tr className="group transition-colors duration-300">
      <RowCell
        value={country.name}
        previousValue={getPreviousYearValue('name')}
        hasYearChanged={hasYearChanged}
        showHighlighting={showHighlighting}
        isSticky={true}
      />
      <RowCell
        value={country.iso_code}
        previousValue={getPreviousYearValue('iso_code')}
        hasYearChanged={hasYearChanged}
        showHighlighting={showHighlighting}
      />
      {mainTableFields.map((field) => (
        <RowCell
          key={field.key}
          value={country[field.key]}
          previousValue={getPreviousYearValue(field.key)}
          hasYearChanged={hasYearChanged}
          showHighlighting={showHighlighting}
        />
      ))}
      {additionalTableFields.map((field) => (
        <RowCell
          key={field.key}
          value={country[field.key]}
          previousValue={getPreviousYearValue(field.key)}
          hasYearChanged={hasYearChanged}
          showHighlighting={showHighlighting}
        />
      ))}
    </tr>
  );
}

export default memo(CountryRow);
