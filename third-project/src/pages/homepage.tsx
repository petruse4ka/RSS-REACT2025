import { Suspense } from 'react';
import { useLocale } from '../hooks/use-locale';
import { TableSkeleton } from '../components/ui/skeleton';
import EmissionTableContent from '../components/emission-table/emission-table-content';
import ErrorBoundary from '@/components/error-boundary';
import errorImage from '@/assets/images/error.svg';
import type { ErrorTexts } from '@/types/interfaces';

export default function HomePage() {
  const translations = useLocale();

  const errorTexts: ErrorTexts = {
    title: translations.table.errorTitle,
    message: translations.table.errorMessage,
    buttonText: translations.table.refreshButton,
  };

  return (
    <div className="mx-auto w-full space-y-6">
      <h2 className="text-scooter-400 dark:text-shamrock-400 mb-2 text-center text-3xl font-bold">
        {translations.homepage.title}
      </h2>
      <ErrorBoundary
        texts={errorTexts}
        image={errorImage}
        className="mt-15 bg-zinc-50 dark:bg-zinc-950"
        imageClassName="w-64 h-64"
        buttonClassName="bg-scooter-500 border border-scooter-500 hover:bg-scooter-400 hover:border-scooter-400 dark:bg-shamrock-400 dark:border-shamrock-400 dark:hover:bg-shamrock-500 dark:hover:border-shamrock-500 transition-colors duration-300 text-white"
      >
        <Suspense fallback={<TableSkeleton />}>
          <EmissionTableContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
