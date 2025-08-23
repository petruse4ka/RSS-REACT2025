import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FormData, UserListState } from '@/types/interfaces';

const initialState: UserListState = {
  count: 0,
  users: [],
};

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<FormData>) => {
      const item = {
        ...action.payload,
      };
      state.users.push(item);
      state.count++;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.users = state.users.filter((item) => item.id !== id);
      state.count--;
    },
    clearAllUsers: (state) => {
      state.users = [];
      state.count = 0;
    },
  },
});

export const { addUser, deleteUser, clearAllUsers } = userListSlice.actions;
export default userListSlice.reducer;
