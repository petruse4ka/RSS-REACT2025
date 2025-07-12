import { PureComponent } from 'react';
import type { CardData } from '@/types/interfaces';
import { SEARCH_TEXTS } from '@/constants';
import Loader from '../ui/loader';
import CardsList from '../cards-list/cards-list';
import Button from '../ui/button';
import { ERROR_TEXTS } from '@/constants';
import { fetchCards } from '@/api/fetch-cards';

type State = {
  cards: CardData[];
  loading: boolean;
  errorTriggered: boolean;
  error: string | null;
  searchQuery: string;
};

export default class Main extends PureComponent<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      loading: true,
      errorTriggered: false,
      error: null,
      searchQuery: '',
    };
  }

  componentDidMount() {
    const searchQuery = localStorage.getItem('konstantinFirstReactProjectSearchQuery') || '';

    this.setState({ searchQuery }, () => {
      this.loadData(searchQuery);
    });
  }

  loadData = async (searchQuery?: string) => {
    try {
      this.setState({ loading: true, error: null });
      const query = searchQuery || this.state.searchQuery;
      const cards = await fetchCards(query);

      if (cards.length === 0) {
        this.setState({
          loading: false,
          error: ERROR_TEXTS.FETCH_ERROR,
        });
        return;
      }

      this.setState({ cards, loading: false });
    } catch {
      this.setState({
        loading: false,
        error: ERROR_TEXTS.FETCH_ERROR,
      });
    }
  };

  handleErrorButtonClick = () => {
    this.setState({ errorTriggered: true });
  };

  render() {
    const { cards, loading, errorTriggered, error } = this.state;

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
        ) : error ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
          </div>
        ) : (
          <>
            <CardsList cards={cards} />
            <div className="w-full mt-8">
              <Button
                type="button"
                onClick={this.handleErrorButtonClick}
                className="w-full bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 py-5"
                text={ERROR_TEXTS.ERROR_BUTTON}
              />
            </div>
          </>
        )}
      </main>
    );
  }
}
