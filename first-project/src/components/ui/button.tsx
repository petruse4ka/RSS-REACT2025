type Props = {
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  className: string;
  text: string;
  dataTestId?: string;
  disabled?: boolean;
};

export default function Button({ type, onClick, className, text, dataTestId, disabled }: Props) {
  const defaultClassName = disabled
    ? 'px-6 py-2 text-white rounded-sm transition duration-300 cursor-not-allowed focus:outline-none'
    : 'px-6 py-2 text-white rounded-sm transition duration-300 cursor-pointer focus:outline-none';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${defaultClassName} ${className}`}
      data-testid={dataTestId}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
