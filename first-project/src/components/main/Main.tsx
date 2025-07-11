import { PureComponent } from 'react';
import defaultImage from '../../assets/images/default-image.png';
import type { CardData } from '../../types/interfaces';
import { SEARCH_TEXTS } from '../../constants';
import Loader from '../ui/loader';
import CardsList from '../cards-list/cards-list';

type state = {
  cards: CardData[];
  loading: boolean;
};

export default class Main extends PureComponent<object, state> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const mockCards: CardData[] = [
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

    this.setState({ cards: mockCards, loading: false });
  };

  render() {
    const { cards, loading } = this.state;

    return (
      <main className="container mx-auto py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader
              classNameSpinner="border-cyan-300"
              classNameText="text-cyan-300 text-lg"
              text={SEARCH_TEXTS.LOADING}
            />
          </div>
        ) : (
          <CardsList cards={cards} />
        )}
      </main>
    );
  }
}
