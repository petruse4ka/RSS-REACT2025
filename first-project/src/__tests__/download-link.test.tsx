import { render, screen, fireEvent } from '@/__tests__/test-utils/test-utils';
import { DownloadLink } from '@/components/cards-list/download-link';
import { mockCardData } from '@/__tests__/mocks/handlers';

// Mock URL.createObjectURL and URL.revokeObjectURL
const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();

Object.defineProperty(URL, 'createObjectURL', {
  value: mockCreateObjectURL,
  writable: true,
});

Object.defineProperty(URL, 'revokeObjectURL', {
  value: mockRevokeObjectURL,
  writable: true,
});

const mockCards = [mockCardData, { ...mockCardData, id: '2', title: 'Second Card' }];

test('DownloadLink renders with download button and hidden anchor element', () => {
  render(
    <DownloadLink
      cards={mockCards}
      filename="test.csv"
      text="Download"
      className="bg-blue-500"
      dataTestId="download-button"
    />
  );

  const button = screen.getByTestId('download-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Download');

  const anchor = screen.getByTestId('download-link-anchor');
  expect(anchor).toBeInTheDocument();
  expect(anchor).toHaveClass('hidden');
});

test('DownloadLink creates blob and triggers download when clicked', () => {
  mockCreateObjectURL.mockReturnValue('blob:mock-url');

  render(
    <DownloadLink
      cards={mockCards}
      filename="test.csv"
      text="Download"
      className="bg-blue-500"
      dataTestId="download-button"
    />
  );

  const button = screen.getByTestId('download-button');
  fireEvent.click(button);

  expect(mockCreateObjectURL).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'text/csv;charset=utf-8;',
    })
  );
});
