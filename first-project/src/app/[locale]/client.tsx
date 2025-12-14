'use client';

import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import Search from '@/components/search/search';
import Main from '@/components/main/main';
import CardDetail from '@/components/card-detail/card-detail';
import { useGetCardsQuery } from '@/store/api';
import { useTranslations } from 'next-intl';
import validateIdParam from '@/utils/validate-id-param';
import validatePageParam from '@/utils/validate-page-param';
import { useLocale } from 'next-intl';
import { CardData } from '@/types/interfaces';
import { useEffect } from 'react';
import { store } from '@/store/store';
import { api } from '@/store/api';

interface Props {
  searchParams: { page?: string; id?: string; query?: string };
  initialData?: { cards: CardData[]; total: number } | null;
}

export default function Client({ searchParams, initialData }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const pageParam = urlSearchParams.get('page') || searchParams.page || null;
  const idParam = urlSearchParams.get('id') || searchParams.id || null;
  const queryParam = urlSearchParams.get('query') || searchParams.query || null;
  const currentPage = validatePageParam(pageParam, locale);
  const cardIndex = validateIdParam(idParam, locale);
  const SearchQuery = queryParam || 'random';

  useEffect(() => {
    if (initialData && SearchQuery) {
      store.dispatch(
        api.util.upsertQueryData('getCards', { searchQuery: SearchQuery, page: 1 }, initialData)
      );
    }
  }, [initialData, SearchQuery]);

  const { data, isLoading, isFetching, isError, error } = useGetCardsQuery({
    searchQuery: SearchQuery,
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

  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    params.set('query', query);
    params.set('page', '1');
    const newUrl = `/?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (SearchQuery && SearchQuery !== 'random') {
      params.set('query', SearchQuery);
    }
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleCardClick = (cardIndex: number) => {
    const params = new URLSearchParams();
    if (SearchQuery && SearchQuery !== 'random') {
      params.set('query', SearchQuery);
    }
    params.set('page', currentPage.toString());
    params.set('id', cardIndex.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleDetailsClose = () => {
    const params = new URLSearchParams();
    if (SearchQuery && SearchQuery !== 'random') {
      params.set('query', SearchQuery);
    }
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
      <Search searchQuery={queryParam || ''} onSearch={handleSearch} />
      <div className="flex flex-col-reverse md:flex-row">
        <div
          className={`${cardIndex ? 'w-full md:w-1/2 xl:w-2/3' : 'w-full'} transition-all duration-300`}
          onClick={handleMainClick}
        >
          <Main
            searchQuery={queryParam || ''}
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
