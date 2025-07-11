import type { CardData } from '@/types/interfaces';
import defaultImage from '@/assets/images/default-image.png';

export const mockCards: CardData[] = [
  {
    id: '1',
    imageUrl: `${defaultImage}`,
    title: 'Title 1',
    description: 'Description 1',
  },
  {
    id: '2',
    imageUrl: `${defaultImage}`,
    title: 'Title 2',
    description: 'Description 2',
  },
  {
    id: '3',
    imageUrl: `${defaultImage}`,
    title: 'Title 3',
    description: 'Description 3',
  },
];
