import type { RootState } from './store';

export const selectUserList = (state: RootState) => state.userList.users;
export const selectUserCount = (state: RootState) => state.userList.count;
export const selectUserListState = (state: RootState) => state.userList;
