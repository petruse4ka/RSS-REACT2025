import type { MouseEvent } from 'react';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  onClick: (e?: MouseEvent) => void;
  className: string;
  text: string;
  dataTestId?: string;
  disabled?: boolean;
};

export default function Button({
  type = 'button',
  onClick,
  className,
  text,
  dataTestId,
  disabled,
}: Props) {
  const defaultClassName = disabled
    ? 'px-4 sm:px-6 py-2 text-white rounded-sm transition duration-300 cursor-not-allowed focus:outline-none'
    : 'px-4 sm:px-6 py-2 text-white rounded-sm transition duration-300 cursor-pointer focus:outline-none';

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
