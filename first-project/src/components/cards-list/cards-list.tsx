import { PureComponent } from 'react';
import type { CardData } from '@/types/interfaces';
import CardItem from './cards-item';

type Props = {
  cards: CardData[];
};

export default class CardsList extends PureComponent<Props> {
  render() {
    const { cards } = this.props;

    return (
      <ul data-testid="cards-list" className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </ul>
    );
  }
}
