'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import Search from '@/components/search/search';
import Main from '@/components/main/main';
import CardDetail from '@/components/card-detail/card-detail';
import useLocalStorage from '@/hooks/use-local-storage';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { useGetCardsQuery } from '@/store/api';
import { useTranslations } from 'next-intl';
import validateIdParam from '@/utils/validate-id-param';
import validatePageParam from '@/utils/validate-page-param';

export default function HomePage() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_QUERY, '');

  const pageParam = searchParams.get('page');
  const idParam = searchParams.get('id');

  const currentPage = validatePageParam(pageParam);
  const cardIndex = validateIdParam(idParam);

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
    router.push('/?page=1', { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (cardIndex) {
      params.set('id', cardIndex.toString());
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleCardClick = (cardIndex: number) => {
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('id', cardIndex.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleDetailsClose = () => {
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
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

        {cardIndex && cards.length > 0 && (
          <CardDetail cardIndex={cardIndex} cards={cards} handleDetailsClose={handleDetailsClose} />
        )}
      </div>
    </div>
  );
}
