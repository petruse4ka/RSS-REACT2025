import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import SelectedCards from '@/components/cards-list/selected-cards';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import selectedCardsReducer from '@/store/selected-cards-slice';
import { mockCardData } from '@/__tests__/mocks/handlers';
import type { SelectedCardsState } from '@/types/interfaces';

const mockCard = { ...mockCardData, id: '1' };

const createTestStore = (initialState: SelectedCardsState = { count: 0, selectedItems: [] }) => {
  return configureStore({
    reducer: {
      selectedCards: selectedCardsReducer,
    },
    preloadedState: {
      selectedCards: initialState,
    },
  });
};

const testRender = (initialState: SelectedCardsState = { count: 0, selectedItems: [] }) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      <SelectedCards />
    </Provider>
  );
};

test('SelectedCards does not render when no items are selected', () => {
  testRender();

  expect(screen.queryByTestId('selected-cards')).not.toBeInTheDocument();
});

test('SelectedCards renders when items are selected', () => {
  const initialState: SelectedCardsState = {
    count: 2,
    selectedItems: [mockCard, { ...mockCard, id: '2' }],
  };

  testRender(initialState);

  expect(screen.getByTestId('selected-cards')).toBeInTheDocument();
  expect(screen.getByText('Photos selected: 2')).toBeInTheDocument();
});

test('SelectedCards renders with download and unselect all buttons when items are selected', () => {
  const initialState: SelectedCardsState = {
    count: 1,
    selectedItems: [mockCard],
  };

  testRender(initialState);

  expect(screen.getByTestId('download-button')).toBeInTheDocument();
  expect(screen.getByTestId('unselect-all-button')).toBeInTheDocument();
});

test('SelectedCards unselects all items when unselect all button is clicked', () => {
  const initialState: SelectedCardsState = {
    count: 2,
    selectedItems: [mockCard, { ...mockCard, id: '2' }],
  };

  const store = createTestStore(initialState);
  const { rerender } = render(
    <Provider store={store}>
      <SelectedCards />
    </Provider>
  );

  const unselectButton = screen.getByTestId('unselect-all-button');
  fireEvent.click(unselectButton);

  rerender(
    <Provider store={store}>
      <SelectedCards />
    </Provider>
  );

  expect(screen.queryByTestId('selected-cards')).not.toBeInTheDocument();
});
