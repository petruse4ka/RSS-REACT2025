import type { ChangeEvent, KeyboardEvent } from 'react';

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeCapture?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  className: string;
  id?: string;
  name?: string;
  list?: string;
  accept?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
};

export default function Input({
  placeholder,
  value,
  onChange,
  onChangeCapture,
  onKeyDown,
  className,
  id,
  name,
  list,
  accept,
  autoComplete,
  autoFocus,
  readOnly,
}: Props) {
  const defaultClassName =
    'flex-1 px-4 py-2 border rounded-sm transition duration-300 focus:outline-none';

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onChangeCapture={onChangeCapture}
      onKeyDown={onKeyDown}
      className={`${defaultClassName} ${className}`}
      id={id}
      name={name || id}
      list={list}
      accept={accept}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      readOnly={readOnly}
    />
  );
}
