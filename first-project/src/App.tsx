import { PureComponent } from 'react';
import Search from './components/search/search';
import Main from './components/main/main';
import ErrorBoundary from './components/error-boundary/error-boundary';
import errorImage from './assets/images/error.svg';
import type { ErrorTexts } from './types/interfaces';
import { ERROR_TEXTS } from './constants';

const errorTexts: ErrorTexts = {
  title: ERROR_TEXTS.TITLE,
  message: ERROR_TEXTS.DESCRIPTION,
  buttonText: ERROR_TEXTS.REFRESH_BUTTON,
};

type State = {
  searchQuery: string;
};

export default class App extends PureComponent<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    const savedQuery = localStorage.getItem('konstantinFirstReactProjectSearchQuery') || '';
    this.setState({ searchQuery: savedQuery });
  }

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <ErrorBoundary
        texts={errorTexts}
        image={errorImage}
        className="min-h-screen px-5 md:px-20"
        containerClassName="bg-indigo-900 backdrop-blur-sm text-white"
        imageClassName="w-64 h-64"
        buttonClassName="bg-fuchsia-500 border border-fuchsia-500 hover:bg-fuchsia-400 hover:border-fuchsia-400"
      >
        <div className="min-h-screen flex flex-col items-center max-w-[1440px] mx-auto py-20 px-5 md:px-20">
          <Search onSearch={this.handleSearch} />
          <Main searchQuery={this.state.searchQuery} />
        </div>
      </ErrorBoundary>
    );
  }
}
