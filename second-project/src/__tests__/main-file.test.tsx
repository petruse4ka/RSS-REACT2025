const mockRender = vi.fn();

const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
}));

vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

const mockRoot = document.createElement('div');
mockRoot.id = 'root';
document.body.appendChild(mockRoot);

vi.spyOn(document, 'getElementById').mockReturnValue(mockRoot);

vi.clearAllMocks();

test('Main file should create root and render AppWrapper', async () => {
  await import('../main');

  expect(document.getElementById).toHaveBeenCalledWith('root');

  expect(mockCreateRoot).toHaveBeenCalledWith(mockRoot);

  expect(mockRender).toHaveBeenCalled();
});
