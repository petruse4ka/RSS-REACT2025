import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Search from '@/components/search/search';
import Main from '@/components/main/main';
import useLocalStorage from '@/hooks/use-local-storage';
import { LOCAL_STORAGE_KEYS, ERROR_TEXTS } from '@/constants';
import type { CardData } from '@/types/interfaces';
import { fetchCards } from '@/api/fetch-cards';

export default function HomePage() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_QUERY, '');
  const [cards, setCards] = useState<CardData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const prevSearchQuery = useRef<string>(searchQuery);

  const pageParam = params.page ? parseInt(params.page, 10) : 1;
  const idParam = params.id ? parseInt(params.id, 10) : null;

  const isPageValid =
    !params.page || (!isNaN(pageParam) && pageParam > 0 && params.page === pageParam.toString());
  const isIdValid =
    !params.id ||
    (idParam !== null && !isNaN(idParam) && idParam > 0 && params.id === idParam.toString());

  useEffect(() => {
    if (!isPageValid || !isIdValid) {
      navigate('/error404', { replace: true });
    }
  }, [isPageValid, isIdValid, navigate]);

  const currentPage = isPageValid ? pageParam : 1;
  const cardIndex = isIdValid ? idParam : null;

  useEffect(() => {
    const loadData = async (searchQuery: string) => {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');

        const pageToFetch = searchQuery !== prevSearchQuery.current ? 1 : currentPage;
        const { cards, total } = await fetchCards(searchQuery, pageToFetch);

        if (cards.length === 0) {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(ERROR_TEXTS.FETCH_ERROR);
          return;
        }

        setCards(cards);
        setTotalItems(total);
        setIsLoading(false);
        prevSearchQuery.current = searchQuery;
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
    if (cardIndex && cards.length > 0 && cardIndex > cards.length) {
      navigate(`/${currentPage}/1`, { replace: true });
    }
  }, [cardIndex, cards.length, currentPage, navigate]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate('/1');
  };

  const handlePageChange = (page: number) => {
    if (cardIndex) {
      navigate(`/${page}`);
    } else {
      navigate(`/${page}`);
    }
  };

  const handleCardClick = (cardIndex: number) => {
    navigate(`/${currentPage}/${cardIndex}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDetailsClose = () => {
    navigate(`/${currentPage}`);
  };

  const handleMainClick = () => {
    if (cardIndex) {
      handleDetailsClose();
    }
  };

  return (
    <div data-testid="homepage" className="flex w-full flex-col">
      <Search searchQuery={searchQuery} onSearch={handleSearch} />
      <div className="flex">
        <div
          className={`${cardIndex ? 'w-1/2 2xl:w-2/3' : 'w-full'} transition-all duration-300`}
          onClick={handleMainClick}
        >
          <Main
            searchQuery={searchQuery}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            handleCardClick={handleCardClick}
            cards={cards}
            totalItems={totalItems}
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessage}
          />
        </div>

        <Outlet context={{ cards, cardIndex, handleDetailsClose }} />
      </div>
    </div>
  );
}
