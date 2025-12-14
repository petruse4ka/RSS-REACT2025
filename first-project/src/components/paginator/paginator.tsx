import type { MouseEvent } from 'react';
import { CARDS_PER_PAGE } from '@/constants';
import { useTranslations } from 'next-intl';
import Button from '../ui/button';
import { PAGINATOR_NAVIGATION } from '@/constants';

type Props = {
  currentPage: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
};

export default function Paginator({ currentPage, totalItems, handlePageChange }: Props) {
  const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE);
  const t = useTranslations();

  if (totalPages <= 1) {
    return null;
  }

  const handlePreviousPage = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div data-testid="paginator" className="my-15 flex items-center justify-center gap-4">
      <Button
        type="button"
        onClick={handlePreviousPage}
        className={`${
          currentPage === 1
            ? 'cursor-not-allowed border-gray-300 bg-gray-300 px-2 text-gray-500 sm:px-6 md:text-xl lg:min-w-[100px] dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400'
            : 'border-cyan-500 bg-cyan-500 px-2 hover:border-cyan-400 hover:bg-cyan-400 sm:px-6 md:text-xl lg:min-w-[100px] dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400'
        }`}
        text={PAGINATOR_NAVIGATION.PREVIOUS}
        dataTestId="previous-button"
        disabled={currentPage === 1}
      />

      <span data-testid="page-info" className="font-medium text-fuchsia-400 dark:text-cyan-300">
        {currentPage} {t('paginator.of')} {totalPages}
      </span>

      <Button
        type="button"
        onClick={handleNextPage}
        className={`${
          currentPage === totalPages
            ? 'border-gray-300 bg-gray-300 px-2 text-gray-500 sm:px-6 md:text-xl lg:min-w-[100px] dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400'
            : 'border-cyan-500 bg-cyan-500 px-2 hover:border-cyan-400 hover:bg-cyan-400 sm:px-6 md:text-xl lg:min-w-[100px] dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400'
        }`}
        text={PAGINATOR_NAVIGATION.NEXT}
        dataTestId="next-button"
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
