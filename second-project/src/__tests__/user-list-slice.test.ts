import userListReducer, { addUser, deleteUser, clearAllUsers } from '@/store/user-list-slice';
import type { FormData } from '@/types/interfaces';

const mockUser: FormData = {
  id: '1',
  name: 'Test User',
  age: 25,
  email: 'test@example.com',
  password: 'password123',
  confirmPassword: 'password123',
  gender: 'male',
  acceptTerms: true,
  picture: 'data:image/png;base64,test',
  country: 'Russia',
};

const mockUser2: FormData = {
  id: '2',
  name: 'Test User 2',
  age: 30,
  email: 'test2@example.com',
  password: 'password456',
  confirmPassword: 'password456',
  gender: 'female',
  acceptTerms: true,
  picture: 'data:image/jpeg;base64,test2',
  country: 'Russia',
};

test('initial state is correct', () => {
  const initialState = userListReducer(undefined, { type: 'unknown' });

  expect(initialState.users).toEqual([]);
  expect(initialState.count).toBe(0);
});

test('addUser adds user to list and increases count', () => {
  const initialState = { users: [], count: 0 };
  const newState = userListReducer(initialState, addUser(mockUser));

  expect(newState.users).toHaveLength(1);
  expect(newState.users[0]).toEqual(mockUser);
  expect(newState.count).toBe(1);
});

test('deleteUser removes user by id and decreases count', () => {
  const initialState = { users: [mockUser, mockUser2], count: 2 };
  const newState = userListReducer(initialState, deleteUser('1'));

  expect(newState.users).toHaveLength(1);
  expect(newState.users[0]).toEqual(mockUser2);
  expect(newState.count).toBe(1);
});

test('deleteUser does nothing if user id does not exist', () => {
  const initialState = { users: [mockUser], count: 1 };
  const newState = userListReducer(initialState, deleteUser('999'));

  expect(newState.users).toHaveLength(1);
  expect(newState.users[0]).toEqual(mockUser);
  expect(newState.count).toBe(1);
});

test('clearAllUsers removes all users and resets count', () => {
  const initialState = { users: [mockUser, mockUser2], count: 2 };
  const newState = userListReducer(initialState, clearAllUsers());

  expect(newState.users).toHaveLength(0);
  expect(newState.count).toBe(0);
});
