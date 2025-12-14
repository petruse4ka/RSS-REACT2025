import type { CardData } from '@/types/interfaces';
import { getCardSize } from '@/utils/get-card-size';
import CardItem from './card';
import { useTranslations } from 'next-intl';

type Props = {
  cards: CardData[];
  handleCardClick?: (cardIndex: number) => void;
  isCardDetailOpen?: boolean;
};

export default function CardsList({ cards, handleCardClick, isCardDetailOpen = false }: Props) {
  const t = useTranslations();

  return cards.length > 0 ? (
    <ul
      data-testid="cards-list"
      className={`grid gap-5 ${
        isCardDetailOpen
          ? 'grid-cols-1 xl:grid-cols-2'
          : 'grid-cols-1 xl:auto-rows-[300px] xl:grid-cols-4'
      }`}
    >
      {cards.map((card, index) => (
        <CardItem
          key={card.id}
          card={card}
          cardIndex={index + 1}
          handleCardClick={handleCardClick}
          classNames={`h-[300px] ${isCardDetailOpen ? '' : `xl:h-[auto] xl:${getCardSize(index)}`}`}
        />
      ))}
    </ul>
  ) : (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <div data-testid="list-error-message" className="mb-4 text-xl font-semibold text-red-500">
        {t('error.fetchError')}
      </div>
    </div>
  );
}
