import type { ReactNode, Ref } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
  id?: string;
  ref?: Ref<HTMLSelectElement>;
};

export default function Select({ children, className = '', dataTestId, id, ref }: Props) {
  const defaultClassName =
    'flex-1 px-4 py-2 border rounded-sm transition duration-300 focus:outline-none cursor-pointer';

  return (
    <select
      ref={ref}
      className={`${defaultClassName} ${className}`}
      data-testid={dataTestId}
      id={id}
    >
      {children}
    </select>
  );
}
