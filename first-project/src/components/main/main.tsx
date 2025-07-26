import { useState, useEffect } from 'react';
import type { CardData } from '@/types/interfaces';
import { SEARCH_TEXTS } from '@/constants';
import Loader from '../ui/loader';
import CardsList from '../cards-list/cards-list';
import Paginator from '../paginator/paginator';
import { ERROR_TEXTS } from '@/constants';
import { fetchCards } from '@/api/fetch-cards';

type Props = {
  searchQuery: string;
};

export default function Main({ searchQuery }: Props) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const loadData = async (searchQuery: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { cards, total } = await fetchCards(searchQuery, currentPage);

      if (cards.length === 0) {
        setIsLoading(false);
        setIsError(true);
        return;
      }

      setCards(cards);
      setTotalItems(total);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    loadData(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > 1) {
      loadData(searchQuery);
    }
  }, [currentPage]);

  return (
    <section data-testid="main" className="container mx-auto w-full py-8">
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
          <div data-testid="list-error-message" className="mb-4 text-xl font-semibold text-red-500">
            {ERROR_TEXTS.FETCH_ERROR}
          </div>
        </div>
      ) : (
        <>
          <CardsList cards={cards} />
          <Paginator
            currentPage={currentPage}
            totalItems={totalItems}
            handlePageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}
