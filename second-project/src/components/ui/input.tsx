import type { ChangeEvent, KeyboardEvent, Ref } from 'react';
import type { FormRegister, FormSchema } from '@/types/types';

type Props = {
  type: 'text' | 'number' | 'password' | 'email' | 'file' | 'checkbox';
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeCapture?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  className: string;
  dataTestId: string;
  id?: keyof FormSchema;
  name?: string;
  list?: string;
  min?: string | number;
  accept?: string;
  autoComplete?: string;
  ref?: Ref<HTMLInputElement>;
  register?: FormRegister;
  autoFocus?: boolean;
};

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  onChangeCapture,
  onKeyDown,
  className,
  dataTestId,
  id,
  name,
  list,
  min,
  accept,
  autoComplete,
  ref,
  register,
  autoFocus,
}: Props) {
  const defaultClassName =
    'flex-1 px-4 py-2 border rounded-sm transition duration-300 focus:outline-none';

  const conditionalProps = register && id ? register(id) : { ref };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onChangeCapture={onChangeCapture}
      onKeyDown={onKeyDown}
      className={`${defaultClassName} ${className}`}
      data-testid={dataTestId}
      id={id}
      name={name || id}
      list={list}
      min={min}
      accept={accept}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      {...conditionalProps}
    />
  );
}
