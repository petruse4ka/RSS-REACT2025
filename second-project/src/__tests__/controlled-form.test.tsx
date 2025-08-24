import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ControlledForm from '@/components/forms/controlled-form';
import userListReducer from '@/store/user-list-slice';
import countriesReducer from '@/store/countries-slice';
import { locales } from '@/locale';

vi.mock('@/hooks/use-locale', () => ({
  useLocale: () => locales.en,
}));

const createMockStore = () => {
  return configureStore({
    reducer: {
      userList: userListReducer,
      countries: countriesReducer,
    },
    preloadedState: {
      countries: {
        countries: [
          { name: 'Russia', code: '7', iso: 'RU' },
          { name: 'USA', code: '1', iso: 'US' },
        ],
      },
    },
  });
};

const renderWithProvider = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(<Provider store={store}>{component}</Provider>);
};

const mockOnSubmit = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

test('ControlledForm renders all form fields', () => {
  renderWithProvider(<ControlledForm onSubmit={mockOnSubmit} />);

  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Age')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Gender')).toBeInTheDocument();
  expect(screen.getByLabelText('Country')).toBeInTheDocument();
  expect(screen.getByLabelText('Profile Picture')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
});

test('ControlledForm shows password strength indicator', () => {
  renderWithProvider(<ControlledForm onSubmit={mockOnSubmit} />);

  const passwordInput = screen.getByLabelText('Password');
  fireEvent.change(passwordInput, { target: { value: 'test123' } });

  expect(screen.getByText('Weak')).toBeInTheDocument();
  expect(screen.getByText('Strong')).toBeInTheDocument();
});

test('ControlledForm shows password mismatch error when passwords do not match', async () => {
  renderWithProvider(<ControlledForm onSubmit={mockOnSubmit} />);

  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');

  fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPassword123!' } });

  await waitFor(() => {
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});

test('ControlledForm submit button is disabled initially', () => {
  renderWithProvider(<ControlledForm onSubmit={mockOnSubmit} />);

  const submitButton = screen.getByRole('button', { name: 'Submit' });
  expect(submitButton).toBeDisabled();
});

test('ControlledForm file input is hidden and shows custom label', () => {
  renderWithProvider(<ControlledForm onSubmit={mockOnSubmit} />);

  const fileInput = screen.getByTestId('picture-input');
  expect(fileInput).toHaveClass('hidden');

  expect(screen.getByText('Choose file')).toBeInTheDocument();
});
