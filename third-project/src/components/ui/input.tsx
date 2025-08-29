import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeCapture?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLInputElement>) => void;
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
  onMouseEnter,
  onMouseLeave,
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
