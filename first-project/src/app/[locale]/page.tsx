'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import Search from '@/components/search/search';
import Main from '@/components/main/main';
import useLocalStorage from '@/hooks/use-local-storage';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { useGetCardsQuery } from '@/store/api';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const [searchQuery, setSearchQuery] = useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_QUERY, '');

  const pageParam = params?.page
    ? Array.isArray(params.page)
      ? params.page[0]
      : params.page
    : null;
  const idParam = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const id = idParam ? parseInt(idParam, 10) : null;

  const isPageValid = !pageParam || (!isNaN(page) && page > 0 && pageParam === page.toString());
  const isIdValid = !idParam || (id !== null && !isNaN(id) && id > 0 && idParam === id.toString());

  useEffect(() => {
    if (!isPageValid || !isIdValid) {
      router.replace('/not-found');
    }
  }, [isPageValid, isIdValid, router]);

  const currentPage = isPageValid ? page : 1;
  const cardIndex = isIdValid ? id : null;

  const { data, isLoading, isFetching, isError, error } = useGetCardsQuery({
    searchQuery: searchQuery || 'random',
    page: currentPage,
  });

  const cards = data?.cards || [];
  const totalItems = data?.total || 0;

  const getErrorMessage = () => {
    if (!isError || !error) return '';

    if (error && typeof error === 'object' && 'status' in error) {
      if (error.status === 403) {
        return t('error.rateLimitError');
      }
      return t('error.fetchError');
    }

    return t('error.fetchError');
  };

  useEffect(() => {
    if (cardIndex && cards.length > 0 && cardIndex > cards.length) {
      router.replace(`/${currentPage}/1`);
    }
  }, [cardIndex, cards.length, currentPage, router]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    router.push('/1');
  };

  const handlePageChange = (page: number) => {
    if (cardIndex) {
      router.push(`/${page}`);
    } else {
      router.push(`/${page}`);
    }
  };

  const handleCardClick = (cardIndex: number) => {
    router.push(`/${currentPage}/${cardIndex}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDetailsClose = () => {
    router.push(`/${currentPage}`);
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
            isFetching={isFetching}
            isError={isError}
            errorMessage={getErrorMessage()}
            isCardDetailOpen={Boolean(cardIndex)}
          />
        </div>

        {/* <Outlet context={{ cards, cardIndex, handleDetailsClose }} /> */}
      </div>
    </div>
  );
}
