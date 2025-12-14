import type { MouseEvent } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e?: MouseEvent) => void;
  className: string;
  text?: string;
  disabled?: boolean;
  children?: ReactNode;
  tabIndex?: number;
};

export default function Button({
  type = 'button',
  onClick,
  className,
  text,
  disabled,
  children,
  tabIndex,
}: Props) {
  const defaultClassName = disabled
    ? 'px-4 sm:px-6 py-2 rounded-sm transition duration-300 cursor-not-allowed focus:outline-none'
    : 'px-4 sm:px-6 py-2 rounded-sm transition duration-300 cursor-pointer focus:outline-none';

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(defaultClassName, className)}
      disabled={disabled}
      tabIndex={tabIndex}
    >
      {children || text}
    </button>
  );
}
