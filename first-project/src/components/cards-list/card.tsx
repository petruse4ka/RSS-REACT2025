import type { MouseEvent } from 'react';
import type { CardData } from '@/types/interfaces';
import Checkbox from '@/components/ui/checkbox';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { selectItem, unselectItem } from '@/store/selected-cards-slice';

type Props = {
  card: CardData;
  cardIndex: number;
  handleCardClick?: (cardIndex: number) => void;
  classNames?: string;
};

export default function CardItem({ card, cardIndex, handleCardClick, classNames }: Props) {
  const { imageUrl, title, description } = card;
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedCards.selectedItems);
  const isChecked = selectedItems.includes(card);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (handleCardClick) {
      handleCardClick(cardIndex);
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      dispatch(unselectItem(card));
    } else {
      dispatch(selectItem(card));
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

        <div className="absolute top-3 right-3 z-10">
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            checkboxClassName="border-fuchsia-400 hover:border-fuchsia-500 dark:border-cyan-300 dark:hover:border-cyan-400"
            checkClassName="dark:text-fuchsia-400 text-cyan-300"
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
          <h2 className="mb-2 line-clamp-2 text-base font-semibold text-cyan-300 sm:text-xl">
            {title}
          </h2>
          <p className="line-clamp-2 text-sm text-fuchsia-400">{description}</p>
        </div>
      </div>
    </li>
  );
}
