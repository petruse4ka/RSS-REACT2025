import type { CardData } from '@/types/interfaces';

type Props = {
  card: CardData;
  cardIndex: number;
  handleCardClick?: (cardIndex: number) => void;
};

export default function CardItem({ card, cardIndex, handleCardClick }: Props) {
  const { imageUrl, title, description } = card;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (handleCardClick) {
      handleCardClick(cardIndex);
    }
  };

  return (
    <li
      data-testid="card-item"
      className="cursor-pointer overflow-hidden rounded-lg bg-indigo-900 transition-all duration-300 hover:scale-102"
      onClick={handleClick}
    >
      <div className="h-50 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full bg-cyan-300 object-cover object-center"
        />
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-base font-semibold text-cyan-300 sm:text-xl">{title}</h2>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </li>
  );
}
