import { PureComponent } from 'react';
import type { CardData } from '@/types/interfaces';

type Props = {
  card: CardData;
};

export default class CardItem extends PureComponent<Props> {
  render() {
    const { imageUrl, title, description } = this.props.card;

    return (
      <li
        data-testid="card-item"
        className="overflow-hidden rounded-lg bg-indigo-900 transition-all duration-300 hover:scale-102"
      >
        <div className="h-50 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full bg-cyan-300 object-cover object-center"
          />
        </div>
        <div className="p-4">
          <h2 className="mb-2 text-xl font-semibold text-cyan-300">{title}</h2>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </li>
    );
  }
}
