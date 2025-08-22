import type { ChangeEvent, KeyboardEvent, Ref } from 'react';

type Props = {
  type: 'text' | 'number' | 'password' | 'email';
  placeholder: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  className: string;
  dataTestId: string;
  id?: string;
  list?: string;
  min?: string;
  ref?: Ref<HTMLInputElement>;
};

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  className,
  dataTestId,
  id,
  list,
  min,
  ref,
}: Props) {
  const defaultClassName =
    'flex-1 px-4 py-2 border rounded-sm transition duration-300 focus:outline-none';

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`${defaultClassName} ${className}`}
      data-testid={dataTestId}
      id={id}
      list={list}
      min={min}
    />
  );
}
