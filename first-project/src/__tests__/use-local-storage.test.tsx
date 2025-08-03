import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../hooks/use-local-storage';
import { setLocalStorageMock } from './test-utils/test-utils';
import { localStorageMock } from './mocks/local-storage-mock';

setLocalStorageMock();

beforeEach(() => {
  vi.clearAllMocks();
});

test('useLocalStorage should update state and localStorage when setValue is called', () => {
  localStorageMock.getItem.mockReturnValue(null);

  const { result } = renderHook(() => useLocalStorage('test-key', 'test-value'));

  act(() => {
    result.current[1]('new-test-value');
  });

  expect(result.current[0]).toBe('new-test-value');
  expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', 'new-test-value');
});
