import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from './src/__tests__/mocks/node';

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
