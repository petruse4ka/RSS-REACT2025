import { CARDS_PER_PAGE, PAGINATOR_TEXTS } from '@/constants';
import Button from '../ui/button';

type Props = {
  currentPage: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
};

export default function Paginator({ currentPage, totalItems, handlePageChange }: Props) {
  const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE);

  if (totalPages <= 1) {
    return null;
  }

  const handlePreviousPage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div data-testid="paginator" className="mt-15 flex items-center justify-center gap-4">
      <Button
        type="button"
        onClick={handlePreviousPage}
        className={`${
          currentPage === 1
            ? 'cursor-not-allowed border-gray-300 bg-gray-300 px-2 text-gray-500 sm:px-6 md:text-xl lg:min-w-[100px]'
            : 'border-fuchsia-500 bg-fuchsia-500 px-2 hover:border-fuchsia-400 hover:bg-fuchsia-400 sm:px-6 md:text-xl lg:min-w-[100px]'
        }`}
        text={PAGINATOR_TEXTS.PREVIOUS}
        dataTestId="previous-button"
        disabled={currentPage === 1}
      />

      <span data-testid="page-info" className="font-medium text-cyan-300">
        {currentPage} {PAGINATOR_TEXTS.OF} {totalPages}
      </span>

      <Button
        type="button"
        onClick={handleNextPage}
        className={`${
          currentPage === totalPages
            ? 'border-gray-300 bg-gray-300 px-2 text-gray-500 sm:px-6 md:text-xl lg:min-w-[100px]'
            : 'border-fuchsia-500 bg-fuchsia-500 px-2 hover:border-fuchsia-400 hover:bg-fuchsia-400 sm:px-6 md:text-xl lg:min-w-[100px]'
        }`}
        text={PAGINATOR_TEXTS.NEXT}
        dataTestId="next-button"
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
