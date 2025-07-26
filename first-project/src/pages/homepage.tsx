import { useSearchParams } from 'react-router-dom';
import Search from '@/components/search/search';
import Main from '@/components/main/main';
import useLocalStorage from '@/hooks/use-local-storage';
import { LOCAL_STORAGE_KEYS } from '@/constants';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_QUERY, '');

  const currentPage = Number(searchParams.get('page')) || 1;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <div data-testid="homepage" className="w-full">
      <Search searchQuery={searchQuery} onSearch={handleSearch} />
      <Main
        searchQuery={searchQuery}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
