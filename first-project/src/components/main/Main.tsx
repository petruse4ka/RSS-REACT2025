import { PureComponent } from 'react';
import defaultImage from '../../assets/images/default-image.png';
import type { CardData } from '../../types/interfaces';
import { SEARCH_TEXTS } from '../../constants';

type state = {
  cards: CardData[];
  loading: boolean;
};

export default class Main extends PureComponent<object, state> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      loading: false,
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

    this.setState({ cards: mockCards });
  };

  render() {
    const { cards, loading } = this.state;

    return (
      <main className="container mx-auto py-8">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="text-lg text-fuchsia-500 ">{SEARCH_TEXTS.LOADING}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-fuchsia-500 rounded-lg overflow-hidden hover:scale-102 transition-all duration-300"
              >
                <div className="h-50 overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className=" bg-cyan-300 w-full h-full object-contain object-center"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-2">{card.title}</h2>
                  <p className="text-sm text-gray-300 ">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    );
  }
}
