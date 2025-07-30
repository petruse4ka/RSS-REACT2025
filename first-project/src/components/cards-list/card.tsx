import type { MouseEvent } from 'react';
import type { CardData } from '@/types/interfaces';

type Props = {
  card: CardData;
  cardIndex: number;
  handleCardClick?: (cardIndex: number) => void;
  classNames?: string;
};

export default function CardItem({ card, cardIndex, handleCardClick, classNames }: Props) {
  const { imageUrl, title, description } = card;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (handleCardClick) {
      handleCardClick(cardIndex);
    }
  };

  return (
    <li
      data-testid="card-item"
      className={`group relative cursor-pointer overflow-hidden rounded-lg bg-indigo-900 transition-all duration-300 hover:shadow-lg hover:contrast-125 ${classNames}`}
      onClick={handleClick}
    >
      <div className="relative h-full w-full">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full bg-cyan-300 object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
          <h2 className="mb-2 line-clamp-2 text-base font-semibold text-white sm:text-xl">
            {title}
          </h2>
          <p className="line-clamp-2 text-sm text-gray-200">{description}</p>
        </div>
      </div>
    </li>
  );
}
