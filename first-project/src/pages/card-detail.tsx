import { useOutletContext } from 'react-router-dom';
import CardDetail from '../components/card-detail/card-detail';
import type { CardData } from '@/types/interfaces';

type Context = {
  cards: CardData[];
  cardIndex: number;
  handleDetailsClose: () => void;
};

export default function CardDetailPage() {
  const { cards, cardIndex, handleDetailsClose } = useOutletContext<Context>();

  return cardIndex && cards.length && handleDetailsClose ? (
    <CardDetail cardIndex={cardIndex} cards={cards} handleDetailsClose={handleDetailsClose} />
  ) : null;
}
