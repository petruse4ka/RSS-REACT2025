import { PureComponent } from 'react';
import type { CardData } from '@/types/interfaces';

type Props = {
  card: CardData;
};

export default class CardItem extends PureComponent<Props> {
  render() {
    const { imageUrl, title, description } = this.props.card;

    return (
      <div className="bg-indigo-900 rounded-lg overflow-hidden hover:scale-102 transition-all duration-300">
        <div className="h-50 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="bg-cyan-300 w-full h-full object-cover object-center"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">{title}</h2>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
    );
  }
}
