import { PureComponent } from 'react';
import type { CardData } from '@/types/interfaces';
import { SEARCH_TEXTS } from '@/constants';
import Loader from '../ui/loader';
import CardsList from '../cards-list/cards-list';
import Button from '../ui/button';
import { ERROR_TEXTS } from '@/constants';
import { fetchCards } from '@/api/fetch-cards';

type Props = {
  searchQuery: string;
};

type State = {
  cards: CardData[];
  loading: boolean;
  errorTriggered: boolean;
  error: string | null;
};

export default class Main extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cards: [],
      loading: true,
      errorTriggered: false,
      error: null,
    };
  }

  componentDidMount() {
    const { searchQuery } = this.props;

    this.loadData(searchQuery);
  }

  componentDidUpdate(prevProps: Props) {
    const { searchQuery } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      this.loadData(searchQuery);
    }
  }

  loadData = async (searchQuery: string) => {
    try {
      this.setState({ loading: true, error: null });
      const cards = await fetchCards(searchQuery);

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

  renderErrorButton = () => (
    <div className="mt-8 w-full">
      <Button
        type="button"
        onClick={this.handleErrorButtonClick}
        className="w-full border-red-500 bg-red-500 py-5 hover:border-red-600 hover:bg-red-600"
        text={ERROR_TEXTS.ERROR_BUTTON}
        dataTestId="error-button"
      />
    </div>
  );

  render() {
    const { cards, loading, errorTriggered, error } = this.state;

    if (errorTriggered) {
      throw new Error('Test error triggered by clicking the button!');
    }

    return (
      <section className="container mx-auto py-8">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader
              classNameSpinner="border-cyan-300"
              classNameText="text-cyan-300 text-lg"
              text={SEARCH_TEXTS.LOADING}
              dataTestId="main-loader"
            />
          </div>
        ) : error ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <div className="mb-4 text-xl font-semibold text-red-500">{error}</div>
            {this.renderErrorButton()}
          </div>
        ) : (
          <>
            <CardsList cards={cards} />
            {this.renderErrorButton()}
          </>
        )}
      </section>
    );
  }
}
