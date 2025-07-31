import { useEffect } from 'react';
import type { CardData } from '@/types/interfaces';
import { CARDS_PER_PAGE } from '@/constants';
import { useLocale } from '@/hooks/use-locale';
import Loader from '../ui/loader';
import CardsList from '../cards-list/cards-list';
import Paginator from '../paginator/paginator';

type Props = {
  searchQuery: string;
  currentPage: number;
  handlePageChange: (page: number) => void;
  handleCardClick?: (cardIndex: number) => void;
  cards: CardData[];
  totalItems: number;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  isCardDetailOpen: boolean;
};

export default function Main({
  currentPage,
  handlePageChange,
  handleCardClick,
  cards,
  totalItems,
  isLoading,
  isError,
  errorMessage,
  isCardDetailOpen,
}: Props) {
  const translations = useLocale();

  useEffect(() => {
    if (totalItems > 0) {
      const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE);
      if (currentPage > totalPages) {
        handlePageChange(1);
      }
    }
  }, [totalItems, currentPage, handlePageChange]);

  return (
    <section data-testid="main" className="w-full">
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader
            classNameSpinner="border-cyan-300"
            classNameText="text-cyan-300 text-lg"
            text={translations.search.loading}
            dataTestId="main-loader"
          />
        </div>
      ) : isError ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center">
          <div
            data-testid="list-error-message"
            className="mb-4 text-center text-xl leading-relaxed font-semibold text-red-500"
          >
            {errorMessage}
          </div>
        </div>
      ) : (
        <div className="pt-5 md:pt-10">
          <CardsList
            cards={cards}
            handleCardClick={handleCardClick}
            isCardDetailOpen={isCardDetailOpen}
          />
          <Paginator
            currentPage={currentPage}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
