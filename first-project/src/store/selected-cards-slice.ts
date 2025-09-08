import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CardData, SelectedCardsState } from '@/types/interfaces';

const initialState: SelectedCardsState = {
  count: 0,
  selectedItems: [],
};

const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<CardData>) => {
      const item = action.payload;
      state.selectedItems.push(item);
      state.count++;
    },
    unselectItem: (state, action: PayloadAction<CardData>) => {
      const selectedItem = action.payload;
      state.selectedItems = state.selectedItems.filter((item) => item.id !== selectedItem.id);
      state.count--;
    },
    clearAllItems: (state) => {
      state.selectedItems = [];
      state.count = 0;
    },
  },
});

export const { selectItem, unselectItem, clearAllItems } = selectedCardsSlice.actions;
export default selectedCardsSlice.reducer;
