import React, { useState } from 'react';
import { useLocale } from '@/hooks/use-locale';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

type Props = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

export default function Search({ searchQuery, onSearch }: Props) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const translations = useLocale();

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    const trimmedQuery = inputValue.trim();
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
    <section data-testid="search" className="mx-auto flex w-full gap-4">
      <Input
        type="text"
        placeholder={translations.search.placeholder}
        value={inputValue}
        onChange={handleSearchQueryChange}
        onKeyDown={handleKeyPress}
        className="min-w-[175px] border-cyan-300 text-fuchsia-400 hover:border-cyan-400 focus:border-cyan-500 dark:border-fuchsia-300 dark:text-cyan-300 dark:hover:border-fuchsia-400 dark:focus:border-fuchsia-500"
        dataTestId="search-input"
      />
      <Button
        type="button"
        onClick={handleSearchButtonClick}
        className="border border-cyan-500 bg-cyan-500 hover:border-cyan-400 hover:bg-cyan-400 dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400"
        text={translations.search.button}
        dataTestId="search-button"
      />
    </section>
  );
}
