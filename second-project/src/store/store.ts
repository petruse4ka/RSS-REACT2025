import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './user-list-slice';
import countriesReducer from './countries-slice';

export const store = configureStore({
  reducer: {
    userList: userListReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
