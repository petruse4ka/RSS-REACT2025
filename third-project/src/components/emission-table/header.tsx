import type { SortField, SortDirection } from '@/types/types';
import type { TableField } from '@/types/interfaces';
import TableHeaderCell from './header-cell';
import { useLocale } from '@/hooks/use-locale';

type Props = {
  mainTableFields: TableField[];
  additionalTableFields: TableField[];
  currentSortField: SortField;
  currentSortDirection: SortDirection;
  onSort: (field: SortField) => void;
};

export default function TableHeader({
  mainTableFields,
  additionalTableFields,
  currentSortField,
  currentSortDirection,
  onSort,
}: Props) {
  const translations = useLocale();

  return (
    <thead className="border-scooter-400 dark:border-shamrock-400 border-b">
      <tr>
        <TableHeaderCell
          field="name"
          label={translations.tableFields.country}
          currentSortField={currentSortField}
          currentSortDirection={currentSortDirection}
          onSort={onSort}
          isSticky={true}
        />
        <TableHeaderCell
          field="iso_code"
          label={translations.tableFields.isoCode}
          currentSortField={currentSortField}
          currentSortDirection={currentSortDirection}
          onSort={onSort}
        />
        {mainTableFields.map((field) => (
          <TableHeaderCell
            key={field.key}
            field={field.key}
            label={field.label}
            currentSortField={currentSortField}
            currentSortDirection={currentSortDirection}
            onSort={onSort}
          />
        ))}
        {additionalTableFields.map((field) => (
          <TableHeaderCell
            key={field.key}
            field={field.key}
            label={field.label}
            currentSortField={currentSortField}
            currentSortDirection={currentSortDirection}
            onSort={onSort}
          />
        ))}
      </tr>
    </thead>
  );
}
