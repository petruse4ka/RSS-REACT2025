import React, { PureComponent } from 'react';
import { SEARCH_TEXTS } from '@/constants';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

type Props = {
  onSearch: (query: string) => void;
};

type State = {
  searchQuery: string;
};

export default class Search extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.loadSearchQuery();
  }

  handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  loadSearchQuery = () => {
    const savedQuery = localStorage.getItem('konstantinFirstReactProjectSearchQuery');
    if (savedQuery) {
      this.setState({ searchQuery: savedQuery });
    }
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    const trimmedQuery = searchQuery.trim();
    localStorage.setItem('konstantinFirstReactProjectSearchQuery', trimmedQuery);
    this.props.onSearch(trimmedQuery);
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      this.handleSearch();
    }
  };

  handleSearchButtonClick = () => {
    this.handleSearch();
  };

  render() {
    return (
      <section className="container flex w-full gap-4">
        <Input
          type="text"
          placeholder={SEARCH_TEXTS.PLACEHOLDER}
          value={this.state.searchQuery}
          onChange={this.handleSearchQueryChange}
          onKeyDown={this.handleKeyPress}
          className="border-fuchsia-300 text-cyan-300 hover:border-fuchsia-400 focus:border-fuchsia-500"
        />
        <Button
          type="button"
          onClick={this.handleSearchButtonClick}
          className="border border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400"
          text={SEARCH_TEXTS.BUTTON}
          dataTestId="search-button"
        />
      </section>
    );
  }
}
