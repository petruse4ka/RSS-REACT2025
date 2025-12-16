import type { CardData } from '@/types/interfaces';
import { useGetCardDetailsQuery } from '@/store/api';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { invalidateTags } from '@/store/api';
import Loader from '../ui/loader';
import Button from '../ui/button';
import { useLocale } from '@/hooks/use-locale';
import DetailHeader from './detail-header';
import DetailPhoto from './detail-photo';
import DetailAuthor from './detail-author';
import DetailStatistics from './detail-statistics';

type Props = {
  cardIndex: number;
  cards: CardData[];
  handleDetailsClose: () => void;
};

export default function CardDetail({ cardIndex, cards, handleDetailsClose }: Props) {
  const translations = useLocale();
  const dispatch = useAppDispatch();
  const cardId = cards[cardIndex - 1]?.id;

  const {
    data: cardData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetCardDetailsQuery(
    { cardId },
    {
      skip: !cardId,
    }
  );

  const getErrorMessage = () => {
    if (!isError || !error) return '';

    if (error && typeof error === 'object' && 'status' in error) {
      if (error.status === 403) {
        return translations.error.rateLimitError;
      }
      return translations.error.fetchError;
    }

    return translations.error.fetchError;
  };

  const handleRefresh = () => {
    dispatch(invalidateTags(['CardDetails']));
  };

  const handleRefreshCurrent = () => {
    dispatch(invalidateTags([{ type: 'CardDetails', id: cardId }]));
  };

  return (
    <div
      data-testid="card-detail"
      className="mt-5 w-full rounded-lg bg-white md:sticky md:top-4 md:mt-10 md:ml-8 md:w-1/2 md:self-start xl:w-1/3 dark:bg-indigo-900"
    >
      {isLoading || isFetching ? (
        <div className="flex h-full items-center justify-center">
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader
              classNameSpinner="border-cyan-500 dark:border-cyan-300"
              classNameText="text-cyan-600 dark:text-cyan-300 text-lg"
              text={translations.cardDetail.loading}
              dataTestId="main-loader"
            />
          </div>
        </div>
      ) : isError ? (
        <div className="flex h-full flex-col items-center justify-center p-6">
          <div className="mb-4 text-center text-lg font-semibold text-red-500 dark:text-red-400">
            {getErrorMessage()}
          </div>
          <div className="flex w-full flex-col gap-5">
            <Button
              type="button"
              onClick={handleDetailsClose}
              className="w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 dark:border-cyan-500 dark:bg-cyan-500 dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
              text={translations.cardDetail.close}
              dataTestId="close-detail-button"
            />
            <Button
              type="button"
              onClick={handleRefreshCurrent}
              className="w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 dark:border-cyan-500 dark:bg-cyan-500 dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
              text={translations.search.refreshCurrentCard}
              dataTestId="refresh-current-detail-button"
            />
            <Button
              type="button"
              onClick={handleRefresh}
              className="w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 dark:border-cyan-500 dark:bg-cyan-500 dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
              text={translations.search.refreshAllCards}
              dataTestId="refresh-all-detail-button"
            />
          </div>
        </div>
      ) : cardData ? (
        <div className="overflow-y-auto" data-testid="card-detail">
          <div className="p-3 sm:p-6">
            <div className="mb-4 flex w-full flex-col gap-5 sm:mb-6">
              <Button
                type="button"
                onClick={handleRefreshCurrent}
                className="w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 dark:border-cyan-500 dark:bg-cyan-500 dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
                text={translations.search.refreshCurrentCard}
                dataTestId="refresh-current-detail-button"
              />
              <Button
                type="button"
                onClick={handleRefresh}
                className="w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 dark:border-cyan-500 dark:bg-cyan-500 dark:hover:border-cyan-400 dark:hover:bg-cyan-400"
                text={translations.search.refreshAllCards}
                dataTestId="refresh-all-detail-button"
              />
            </div>

            <DetailHeader handleClose={handleDetailsClose} />

            <DetailPhoto
              imageUrl={cardData.imageUrl}
              title={cardData.title}
              description={cardData.description}
            />

            <DetailAuthor author={cardData.author} />

            <DetailStatistics stats={cardData.stats} />

            <Button
              type="button"
              onClick={() => window.open(cardData.links.html, '_blank')}
              className="mt-4 w-full border-cyan-500 bg-cyan-500 hover:border-cyan-400 hover:bg-cyan-400 sm:mt-6 dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400"
              text={translations.cardDetail.viewOnUnsplash}
              dataTestId="unsplash-link-button"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
