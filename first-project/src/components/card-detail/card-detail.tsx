import { useState, useEffect } from 'react';
import type { CardDetailResponse, CardData } from '@/types/interfaces';
import { fetchCardDetails } from '@/api/fetch-card-details';
import Loader from '../ui/loader';
import Button from '../ui/button';
import { useLocale } from '@/hooks/use-locale';
import DetailHeader from './detail-header';
import DetailPhoto from './detail-photo';
import DetailAuthor from './detail-author';
import DetailStatistics from './detail-statistics';
import { FETCH_ERRORS } from '@/constants';

type Props = {
  cardIndex: number;
  cards: CardData[];
  handleDetailsClose: () => void;
};

export default function CardDetail({ cardIndex, cards, handleDetailsClose }: Props) {
  const [cardData, setCardData] = useState<CardDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const translations = useLocale();

  useEffect(() => {
    const loadCardData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');

        const cardId = cards[cardIndex - 1]?.id;

        if (!cardId) {
          throw new Error(FETCH_ERRORS.CARD_NOT_FOUND);
        }

        const card = await fetchCardDetails(cardId, translations);
        setCardData(card);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);

        if (error instanceof Error && error.message === FETCH_ERRORS.HTTP_ERROR + ' 403') {
          setErrorMessage(translations.error.rateLimitError);
        } else {
          setErrorMessage(translations.error.fetchError);
        }
      }
    };

    if (cardIndex && cards.length > 0 && cards.length >= cardIndex) {
      loadCardData();
    }
  }, [cardIndex, cards, translations]);

  return (
    <div className="sticky top-4 mt-5 ml-2 w-1/2 self-start rounded-lg bg-indigo-900 sm:ml-4 md:mt-10 md:ml-8 xl:w-1/3 dark:bg-gray-900">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader
              classNameSpinner="border-cyan-300"
              classNameText="text-cyan-300 text-lg"
              text={translations.cardDetail.loading}
              dataTestId="main-loader"
            />
          </div>
        </div>
      ) : isError ? (
        <div className="flex h-full flex-col items-center justify-center p-6">
          <div className="mb-4 text-center text-lg font-semibold text-red-500">{errorMessage}</div>
          <Button
            type="button"
            onClick={handleDetailsClose}
            className="border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400"
            text={translations.cardDetail.close}
            dataTestId="close-detail-button"
          />
        </div>
      ) : cardData ? (
        <div className="overflow-y-auto" data-testid="card-detail">
          <div className="p-3 sm:p-6">
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
              className="mt-4 w-full border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400 sm:mt-6"
              text={translations.cardDetail.viewOnUnsplash}
              dataTestId="unsplash-link-button"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
