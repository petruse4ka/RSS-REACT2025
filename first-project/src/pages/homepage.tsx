import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Search from '@/components/search/search';
import Main from '@/components/main/main';
import useLocalStorage from '@/hooks/use-local-storage';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { useGetCardsQuery } from '@/store/api';
import { useLocale } from '@/hooks/use-locale';

export default function HomePage() {
  const translations = useLocale();
  const params = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_QUERY, '');

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

  const { data, isLoading, isError, error } = useGetCardsQuery({
    searchQuery: searchQuery || 'random',
    page: currentPage,
  });

  const cards = data?.cards || [];
  const totalItems = data?.total || 0;

  const getErrorMessage = () => {
    if (!isError || !error) return '';

    if (error instanceof Error) {
      if (error.message.includes('HTTP error: 403')) {
        return translations.error.rateLimitError;
      }
    }

    return translations.error.fetchError;
  };

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
      <div className="flex flex-col-reverse md:flex-row">
        <div
          className={`${cardIndex ? 'w-full md:w-1/2 xl:w-2/3' : 'w-full'} transition-all duration-300`}
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
            errorMessage={getErrorMessage()}
            isCardDetailOpen={Boolean(cardIndex)}
          />
        </div>

        <Outlet context={{ cards, cardIndex, handleDetailsClose }} />
      </div>
    </div>
  );
}
