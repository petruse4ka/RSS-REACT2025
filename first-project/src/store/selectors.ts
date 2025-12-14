import type { RootState } from './store';

export const selectSelectedItems = (state: RootState) => state.selectedCards.selectedItems;
export const selectSelectedCount = (state: RootState) => state.selectedCards.count;
export const selectSelectedCards = (state: RootState) => state.selectedCards;
