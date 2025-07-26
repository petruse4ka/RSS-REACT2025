import { useState, useEffect } from 'react';
import type { CardData } from '@/types/interfaces';
import { SEARCH_TEXTS, CARDS_PER_PAGE } from '@/constants';
import Loader from '../ui/loader';
import CardsList from '../cards-list/cards-list';
import Paginator from '../paginator/paginator';
import { ERROR_TEXTS } from '@/constants';
import { fetchCards } from '@/api/fetch-cards';

type Props = {
  searchQuery: string;
  currentPage: number;
  handlePageChange: (page: number) => void;
  handleCardClick?: (cardIndex: number) => void;
};

export default function Main({
  searchQuery,
  currentPage,
  handlePageChange,
  handleCardClick,
}: Props) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadData = async (searchQuery: string) => {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');
        const { cards, total } = await fetchCards(searchQuery, currentPage);

        if (cards.length === 0) {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(ERROR_TEXTS.FETCH_ERROR);
          return;
        }

        setCards(cards);
        setTotalItems(total);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);

        if (error instanceof Error && error.message === 'HTTP error: 403') {
          setErrorMessage(ERROR_TEXTS.RATE_LIMIT_ERROR);
        } else {
          setErrorMessage(ERROR_TEXTS.FETCH_ERROR);
        }
      }
    };

    loadData(searchQuery);
  }, [searchQuery, currentPage]);

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
            text={SEARCH_TEXTS.LOADING}
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
        <div className="py-4">
          <CardsList cards={cards} handleCardClick={handleCardClick} />
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
