import { PureComponent } from 'react';
import type { CardData } from '../../types/interfaces';

type props = {
  card: CardData;
};

export default class CardItem extends PureComponent<props> {
  render() {
    const { imageUrl, title, description } = this.props.card;

    return (
      <div className="bg-fuchsia-500 rounded-lg overflow-hidden hover:scale-102 transition-all duration-300">
        <div className="h-50 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="bg-cyan-300 w-full h-full object-contain object-center"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
    );
  }
}
