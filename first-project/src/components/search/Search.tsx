import React, { PureComponent } from 'react';
import { SEARCH_TEXTS } from '@/constants';

type state = {
  searchQuery: string;
};

export default class Search extends PureComponent<object, state> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  handleSearchButtonClick = () => {
    console.log('Search query:', this.state.searchQuery);
  };

  render() {
    return (
      <div className="flex gap-4 w-full">
        <input
          type="text"
          placeholder={SEARCH_TEXTS.PLACEHOLDER}
          value={this.state.searchQuery}
          onChange={this.handleSearchQueryChange}
          className="flex-1 min-w-[200px] px-4 py-2 border border-fuchsia-200 text-white rounded-sm hover:border-fuchsia-300 focus:outline-none focus:border-fuchsia-500 transition"
        />
        <button
          onClick={this.handleSearchButtonClick}
          className="px-6 py-2 bg-fuchsia-500 border border-fuchsia-500 text-white rounded-sm hover:bg-fuchsia-400 hover:border-fuchsia-400 transition cursor-pointer"
        >
          {SEARCH_TEXTS.BUTTON}
        </button>
      </div>
    );
  }
}
