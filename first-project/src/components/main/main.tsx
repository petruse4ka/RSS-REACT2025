import { useEffect } from 'react';
import type { CardData } from '@/types/interfaces';
import { CARDS_PER_PAGE } from '@/constants';
import { useLocale } from '@/hooks/use-locale';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { invalidateTags } from '@/store/api';
import Loader from '../ui/loader';
import Button from '../ui/button';
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (totalItems > 0) {
      const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE);
      if (currentPage > totalPages) {
        handlePageChange(1);
      }
    }
  }, [totalItems, currentPage, handlePageChange]);

  const handleRefresh = () => {
    dispatch(invalidateTags(['Cards']));
  };

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
          <Button
            type="button"
            onClick={handleRefresh}
            className="w-full border-cyan-500 bg-cyan-500 hover:border-cyan-400 hover:bg-cyan-400 dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400"
            text={translations.search.refreshQuery}
            dataTestId="refresh-button"
          />
        </div>
      ) : (
        <div className="pt-5 md:pt-10">
          <div className="mb-4 flex justify-end">
            <Button
              type="button"
              onClick={handleRefresh}
              className="w-full border-cyan-500 bg-cyan-500 hover:border-cyan-400 hover:bg-cyan-400 dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400"
              text={translations.search.refreshQuery}
              dataTestId="refresh-button"
            />
          </div>
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
