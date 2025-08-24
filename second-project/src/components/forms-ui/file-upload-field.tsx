import type { ReactNode } from 'react';
import Field from '@/components/ui/field';

type Props = {
  label: string;
  error?: string;
  dataTestId: string;
  children: ReactNode;
  chooseFileText: string;
  noFileChosenText: string;
  selectedFileName?: string;
};

export default function FileUploadField({
  label,
  error,
  dataTestId,
  children,
  chooseFileText,
  noFileChosenText,
  selectedFileName,
}: Props) {
  return (
    <Field label={label} htmlFor="picture" error={error} dataTestId={dataTestId}>
      <div className="mt-1 flex items-center">
        {children}
        <label
          htmlFor="picture"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'NumpadEnter') {
              e.preventDefault();
              document.getElementById('picture')?.click();
            }
          }}
          className="flex-shrink-0 cursor-pointer rounded-sm border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-yellow-200 focus:border-yellow-300 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:border-cyan-400 dark:focus:border-cyan-500"
        >
          {chooseFileText}
        </label>
        <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
          {selectedFileName || noFileChosenText}
        </span>
      </div>
    </Field>
  );
}
