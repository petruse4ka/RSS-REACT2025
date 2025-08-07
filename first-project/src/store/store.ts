import { configureStore } from '@reduxjs/toolkit';
import selectedCardsReducer from './selected-cards-slice';
import { api } from './api';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
