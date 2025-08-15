import { Suspense } from 'react';
import { fetchCards } from '@/api/fetch-cards';
import { DEFAULT_SEARCH_QUERY } from '@/constants';
import Client from './client';
import Loader from '@/components/ui/loader';
import { useTranslations } from 'next-intl';

interface Props {
  searchParams: Promise<{ page?: string; id?: string; query?: string }>;
}

async function HomePageContent({ searchParams }: Props) {
  const params = await searchParams;
  const hasSearchParams = params.page || params.id || params.query;
  let initialData = null;

  if (!hasSearchParams) {
    initialData = await fetchCards(DEFAULT_SEARCH_QUERY, 1);
  }

  return <Client initialData={initialData} searchParams={params} />;
}

function LoadingFallback() {
  const t = useTranslations('search');

  return (
    <Loader
      classNameSpinner="border-blue-500"
      classNameText="text-gray-600"
      text={t('loading')}
      dataTestId="page-loader"
    />
  );
}

export default function HomePage(props: Props) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomePageContent {...props} />
    </Suspense>
  );
}
