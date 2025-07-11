import { PureComponent } from 'react';
import type { CardData } from '@/types/interfaces';
import { SEARCH_TEXTS } from '@/constants';
import Loader from '../ui/loader';
import CardsList from '../cards-list/cards-list';
import Button from '../ui/button';
import { mockCards } from '../data';
import { ERROR_TEXTS } from '@/constants';

type State = {
  cards: CardData[];
  loading: boolean;
  errorTriggered: boolean;
};

export default class Main extends PureComponent<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      loading: true,
      errorTriggered: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ cards: mockCards, loading: false });
  };

  handleErrorButtonClick = () => {
    this.setState({ errorTriggered: true });
  };

  render() {
    const { cards, loading, errorTriggered } = this.state;

    if (errorTriggered) {
      throw new Error('Test error triggered by clicking the button!');
    }

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
          <>
            <CardsList cards={cards} />
            <div className="w-full mt-8">
              <Button
                type="button"
                onClick={this.handleErrorButtonClick}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 text-lg"
                text={ERROR_TEXTS.ERROR_BUTTON}
              />
            </div>
          </>
        )}
      </main>
    );
  }
}
