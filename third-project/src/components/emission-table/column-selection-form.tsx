import { useState, useCallback } from 'react';
import { useLocale } from '@/hooks/use-locale';
import useAdditionalTableFields from '@/hooks/use-additional-table-fields';
import { useColumnSelectionStore } from '@/store/column-selection-store';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';

type Props = {
  onClose: () => void;
};

export default function ColumnSelectionForm({ onClose }: Props) {
  const translations = useLocale();
  const allFields = useAdditionalTableFields();
  const { selectedFields, setSelectedFields } = useColumnSelectionStore();
  const [temporarySelectedFields, setTemporarySelectedFields] = useState<string[]>(selectedFields);

  const handleSave = useCallback(() => {
    setSelectedFields(temporarySelectedFields);
    onClose();
  }, [temporarySelectedFields, setSelectedFields, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleToggleField = useCallback((fieldKey: string) => {
    setTemporarySelectedFields((prev) =>
      prev.includes(fieldKey) ? prev.filter((key) => key !== fieldKey) : [...prev, fieldKey]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setTemporarySelectedFields(allFields.map((field) => field.key));
  }, [allFields]);

  const handleDeselectAll = useCallback(() => {
    setTemporarySelectedFields([]);
  }, []);

  const selectedCount = temporarySelectedFields.length;
  const totalCount = allFields.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex gap-2">
          <Button
            onClick={handleSelectAll}
            className="bg-scooter-400 hover:bg-scooter-500 dark:bg-shamrock-400 dark:hover:bg-shamrock-500 text-white"
            text={translations.controls.selectAll}
          />
          <Button
            onClick={handleDeselectAll}
            className="bg-zinc-400 text-white hover:bg-zinc-500"
            text={translations.controls.deselectAll}
          />
        </div>
        <div className="text-scooter-400 dark:text-shamrock-400 text-sm">
          {translations.controls.selected} {selectedCount} {translations.controls.of} {totalCount}
        </div>
      </div>
      <div className="max-h-[45vh] space-y-2 overflow-y-auto">
        {allFields.map((field) => {
          const isSelected = temporarySelectedFields.includes(field.key);

          return (
            <label
              key={field.key}
              className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => handleToggleField(field.key)}
            >
              <Checkbox
                id={`field-${field.key}`}
                checked={isSelected}
                onClick={() => handleToggleField(field.key)}
                checkboxClassName="border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700 text-scooter-600 dark:text-shamrock-600 focus:ring-scooter-500 dark:focus:ring-shamrock-500"
                checkClassName="text-scooter-600 dark:text-shamrock-600"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{field.label}</span>
            </label>
          );
        })}
      </div>

      <div className="flex justify-end space-x-3 border-t border-zinc-200 pt-4 pb-4 dark:border-zinc-700">
        <Button
          onClick={handleSave}
          className="bg-scooter-400 hover:bg-scooter-500 dark:bg-shamrock-400 dark:hover:bg-shamrock-500 w-full text-white"
          text={translations.controls.save}
        />
        <Button
          onClick={handleCancel}
          className="w-full bg-zinc-400 text-white hover:bg-zinc-500"
          text={translations.controls.cancel}
        />
      </div>
    </div>
  );
}
