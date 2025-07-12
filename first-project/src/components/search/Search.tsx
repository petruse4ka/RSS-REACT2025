import React, { PureComponent } from 'react';
import { SEARCH_TEXTS } from '@/constants';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

type State = {
  searchQuery: string;
};

export default class Search extends PureComponent<object, State> {
  constructor(props: object) {
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
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleSearchButtonClick = () => {
    this.handleSearch();
  };

  render() {
    return (
      <div className="container flex gap-4 w-full">
        <Input
          type="text"
          placeholder={SEARCH_TEXTS.PLACEHOLDER}
          value={this.state.searchQuery}
          onChange={this.handleSearchQueryChange}
          onKeyDown={this.handleKeyPress}
          className="text-white border-fuchsia-300 hover:border-fuchsia-400 focus:border-fuchsia-500"
        />
        <Button
          type="button"
          onClick={this.handleSearchButtonClick}
          className="bg-fuchsia-500 border border-fuchsia-500 hover:bg-fuchsia-400 hover:border-fuchsia-400"
          text={SEARCH_TEXTS.BUTTON}
        />
      </div>
    );
  }
}
