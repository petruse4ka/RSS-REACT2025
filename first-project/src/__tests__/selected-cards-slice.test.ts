import { configureStore } from '@reduxjs/toolkit';
import selectedCardsReducer, {
  selectItem,
  unselectItem,
  clearAllItems,
} from '@/store/selected-cards-slice';
import { mockCardData } from '@/__tests__/mocks/handlers';

const mockCard1 = { ...mockCardData, id: '1' };
const mockCard2 = { ...mockCardData, id: '2' };

const createTestStore = () => {
  return configureStore({
    reducer: {
      selectedCards: selectedCardsReducer,
    },
  });
};

test('SelectedCardsSlice handles initial state', () => {
  const store = createTestStore();
  const state = store.getState().selectedCards;

  expect(state.count).toBe(0);
  expect(state.selectedItems).toEqual([]);
});

test('SelectedCardsSlice handles selectItem', () => {
  const store = createTestStore();

  store.dispatch(selectItem(mockCard1));

  const state = store.getState().selectedCards;
  expect(state.count).toBe(1);
  expect(state.selectedItems).toHaveLength(1);
  expect(state.selectedItems[0]).toEqual(mockCard1);
});

test('SelectedCardsSlice handles multiple selectItem calls', () => {
  const store = createTestStore();

  store.dispatch(selectItem(mockCard1));
  store.dispatch(selectItem(mockCard2));

  const state = store.getState().selectedCards;
  expect(state.count).toBe(2);
  expect(state.selectedItems).toHaveLength(2);
  expect(state.selectedItems).toContainEqual(mockCard1);
  expect(state.selectedItems).toContainEqual(mockCard2);
});

test('SelectedCardsSlice handles unselectItem', () => {
  const store = createTestStore();

  store.dispatch(selectItem(mockCard1));
  store.dispatch(selectItem(mockCard2));
  store.dispatch(unselectItem(mockCard1));

  const state = store.getState().selectedCards;
  expect(state.count).toBe(1);
  expect(state.selectedItems).toHaveLength(1);
  expect(state.selectedItems[0]).toEqual(mockCard2);
});

test('SelectedCardsSlice handles clearAllItems', () => {
  const store = createTestStore();

  store.dispatch(selectItem(mockCard1));
  store.dispatch(selectItem(mockCard2));
  store.dispatch(clearAllItems());

  const state = store.getState().selectedCards;
  expect(state.count).toBe(0);
  expect(state.selectedItems).toEqual([]);
});
