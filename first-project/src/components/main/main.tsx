import { useEffect } from 'react';
import type { MouseEvent } from 'react';
import type { CardData } from '@/types/interfaces';
import { CARDS_PER_PAGE, DEFAULT_SEARCH_QUERY } from '@/constants';
import { useTranslations } from 'next-intl';
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
  isFetching: boolean;
  isError: boolean;
  errorMessage: string;
  isCardDetailOpen: boolean;
};

export default function Main({
  searchQuery,
  currentPage,
  handlePageChange,
  handleCardClick,
  cards,
  totalItems,
  isLoading,
  isFetching,
  isError,
  errorMessage,
  isCardDetailOpen,
}: Props) {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (totalItems > 0) {
      const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE);
      if (currentPage > totalPages) {
        handlePageChange(1);
      }
    }
  }, [totalItems, currentPage, handlePageChange]);

  const handleRefresh = (e?: MouseEvent<Element>) => {
    e?.stopPropagation();
    dispatch(invalidateTags(['Cards']));
  };

  const handleRefreshCurrent = (e?: MouseEvent<Element>) => {
    e?.stopPropagation();
    const currentSearchQuery = searchQuery || DEFAULT_SEARCH_QUERY;
    dispatch(
      invalidateTags([{ type: 'Cards', id: `SEARCH_${currentSearchQuery}_PAGE_${currentPage}` }])
    );
  };

  return (
    <section data-testid="main" className="w-full">
      {isLoading || isFetching ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader
            classNameSpinner="border-cyan-300"
            classNameText="text-cyan-300 text-lg"
            text={t('search.loading')}
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
          <div className="flex w-full flex-col gap-5">
            <Button
              type="button"
              onClick={handleRefreshCurrent}
              className="w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 dark:border-cyan-500 dark:bg-cyan-500 dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
              text={t('search.refreshCurrentPage')}
              dataTestId="refresh-current-button"
            />
            <Button
              type="button"
              onClick={handleRefresh}
              className="w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 dark:border-cyan-500 dark:bg-cyan-500 dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
              text={t('search.refreshAllPages')}
              dataTestId="refresh-all-button"
            />
          </div>
        </div>
      ) : (
        <div className="pt-5 md:pt-10">
          <div className="mb-6 flex w-full flex-col gap-5">
            <Button
              type="button"
              onClick={handleRefreshCurrent}
              className="w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 dark:border-cyan-500 dark:bg-cyan-500 dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
              text={t('search.refreshCurrentPage')}
              dataTestId="refresh-current-button"
            />
            <Button
              type="button"
              onClick={handleRefresh}
              className="w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 dark:border-cyan-500 dark:bg-cyan-500 dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
              text={t('search.refreshAllPages')}
              dataTestId="refresh-all-button"
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
