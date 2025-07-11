import React, { PureComponent } from 'react';
import { SEARCH_TEXTS } from '@/constants';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

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
      <div className="container flex gap-4 w-full">
        <Input
          type="text"
          placeholder={SEARCH_TEXTS.PLACEHOLDER}
          value={this.state.searchQuery}
          onChange={this.handleSearchQueryChange}
          className="border-fuchsia-300 text-white hover:border-fuchsia-500 focus:border-cyan-300"
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
