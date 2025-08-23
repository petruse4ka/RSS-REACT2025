import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './user-list-slice';

export const store = configureStore({
  reducer: {
    userList: userListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
