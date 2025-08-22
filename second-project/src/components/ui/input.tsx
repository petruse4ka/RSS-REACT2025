import type { ChangeEvent, KeyboardEvent } from 'react';

type Props = {
  type: 'text' | 'number' | 'password' | 'email';
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  className: string;
  dataTestId: string;
};

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  className,
  dataTestId,
}: Props) {
  const defaultClassName =
    'flex-1 px-4 py-2 border rounded-sm transition duration-300 focus:outline-none';

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`${defaultClassName} ${className}`}
      data-testid={dataTestId}
    />
  );
}
