import Search from '@/components/search/search';
import Main from '@/components/main/main';
import useLocalStorage from '@/hooks/use-local-storage';
import { LOCAL_STORAGE_KEYS } from '@/constants';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_QUERY, '');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div data-testid="homepage" className="w-full">
      <Search searchQuery={searchQuery} onSearch={handleSearch} />
      <Main searchQuery={searchQuery} />
    </div>
  );
}
