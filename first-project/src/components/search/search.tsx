import React, { useState, useEffect } from 'react';
import { SEARCH_TEXTS } from '@/constants';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

type Props = {
  onSearch: (query: string) => void;
};

export default function Search({ onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSearchQuery();
  }, []);

  const loadSearchQuery = () => {
    const savedQuery = localStorage.getItem('konstantinFirstReactProjectSearchQuery');
    if (savedQuery) {
      setSearchQuery(savedQuery);
    }
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    localStorage.setItem('konstantinFirstReactProjectSearchQuery', trimmedQuery);
    onSearch(trimmedQuery);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      handleSearch();
    }
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  return (
    <section data-testid="search" className="container flex w-full gap-4">
      <Input
        type="text"
        placeholder={SEARCH_TEXTS.PLACEHOLDER}
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onKeyDown={handleKeyPress}
        className="border-fuchsia-300 text-cyan-300 hover:border-fuchsia-400 focus:border-fuchsia-500"
        dataTestId="search-input"
      />
      <Button
        type="button"
        onClick={handleSearchButtonClick}
        className="border border-fuchsia-500 bg-fuchsia-500 hover:border-fuchsia-400 hover:bg-fuchsia-400"
        text={SEARCH_TEXTS.BUTTON}
        dataTestId="search-button"
      />
    </section>
  );
}
