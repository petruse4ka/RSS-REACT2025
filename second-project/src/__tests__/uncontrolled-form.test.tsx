import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactElement } from 'react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UncontrolledForm from '@/components/forms/uncontrolled-form';
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

const renderWithProvider = (component: ReactElement) => {
  const store = createMockStore();
  return render(<Provider store={store}>{component}</Provider>);
};
const mockOnSubmit = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

test('UncontrolledForm renders all form fields', () => {
  renderWithProvider(<UncontrolledForm onSubmit={mockOnSubmit} />);

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

test('UncontrolledForm shows password strength indicator', () => {
  renderWithProvider(<UncontrolledForm onSubmit={mockOnSubmit} />);

  const passwordInput = screen.getByLabelText('Password');
  fireEvent.change(passwordInput, { target: { value: 'test123' } });

  expect(screen.getByText('Weak')).toBeInTheDocument();
  expect(screen.getByText('Strong')).toBeInTheDocument();
});

test('UncontrolledForm file input is hidden and shows custom label', () => {
  renderWithProvider(<UncontrolledForm onSubmit={mockOnSubmit} />);

  const fileInput = screen.getByTestId('picture-input');
  expect(fileInput).toHaveClass('hidden');

  expect(screen.getByText('Choose file')).toBeInTheDocument();
});

test('UncontrolledForm country input has datalist with countries from Redux', () => {
  renderWithProvider(<UncontrolledForm onSubmit={mockOnSubmit} />);

  const countryInput = screen.getByLabelText('Country');
  expect(countryInput).toHaveAttribute('list', 'countries');
});

test('UncontrolledForm form validation shows errors for invalid data', async () => {
  renderWithProvider(<UncontrolledForm onSubmit={mockOnSubmit} />);

  expect(screen.queryByText('Name can only contain letters and spaces')).not.toBeInTheDocument();
  expect(screen.queryByText('Age must be at least 18 years old')).not.toBeInTheDocument();
  expect(screen.queryByText('Enter a valid email address')).not.toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: 'Submit' });
  fireEvent.click(submitButton);

  expect(screen.getByText('Name can only contain letters and spaces')).toBeInTheDocument();
  expect(screen.getByText('Age must be at least 18 years old')).toBeInTheDocument();
  expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();

  expect(mockOnSubmit).not.toHaveBeenCalled();
});

test('UncontrolledForm form validation prevents submission with missing required fields', async () => {
  renderWithProvider(<UncontrolledForm onSubmit={mockOnSubmit} />);

  expect(screen.queryByText('Name can only contain letters and spaces')).not.toBeInTheDocument();
  expect(screen.queryByText('Age must be at least 18 years old')).not.toBeInTheDocument();
  expect(screen.queryByText('Enter a valid email address')).not.toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: 'Submit' });
  fireEvent.click(submitButton);

  expect(screen.getByText('Name can only contain letters and spaces')).toBeInTheDocument();
  expect(screen.getByText('Age must be at least 18 years old')).toBeInTheDocument();
  expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();

  expect(mockOnSubmit).not.toHaveBeenCalled();
});

test('UncontrolledForm shows validation error for invalid country', async () => {
  renderWithProvider(<UncontrolledForm onSubmit={mockOnSubmit} />);

  const countryInput = screen.getByLabelText('Country');

  fireEvent.change(countryInput, { target: { value: 'InvalidCountry' } });

  const submitButton = screen.getByRole('button', { name: 'Submit' });
  fireEvent.click(submitButton);

  expect(screen.getByText('Please select a valid country from the list')).toBeInTheDocument();
  expect(mockOnSubmit).not.toHaveBeenCalled();
});
