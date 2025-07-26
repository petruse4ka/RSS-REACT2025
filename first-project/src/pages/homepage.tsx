import { useParams, useNavigate } from 'react-router-dom';
import Search from '@/components/search/search';
import Main from '@/components/main/main';
import CardDetail from '@/components/card-detail/card-detail';
import useLocalStorage from '@/hooks/use-local-storage';
import { LOCAL_STORAGE_KEYS } from '@/constants';

export default function HomePage() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_QUERY, '');

  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const cardIndex = params.id ? parseInt(params.id, 10) : null;

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
          />
        </div>

        {cardIndex && (
          <div className="mt-4 mb-4 ml-2 w-1/2 self-start rounded-lg bg-indigo-900 sm:ml-4 md:ml-8 2xl:w-1/3">
            <CardDetail cardIndex={cardIndex} handleClose={handleDetailsClose} />
          </div>
        )}
      </div>
    </div>
  );
}
