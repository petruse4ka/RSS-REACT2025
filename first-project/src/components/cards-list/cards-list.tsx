import type { CardData } from '@/types/interfaces';
import { ERROR_TEXTS } from '@/constants';
import CardItem from './card';

type Props = {
  cards: CardData[];
  handleCardClick?: (cardIndex: number) => void;
};

export default function CardsList({ cards, handleCardClick }: Props) {
  return cards.length > 0 ? (
    <ul data-testid="cards-list" className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {cards.map((card, index) => (
        <CardItem
          key={card.id}
          card={card}
          cardIndex={index + 1}
          handleCardClick={handleCardClick}
        />
      ))}
    </ul>
  ) : (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <div data-testid="list-error-message" className="mb-4 text-xl font-semibold text-red-500">
        {ERROR_TEXTS.FETCH_ERROR}
      </div>
    </div>
  );
}
