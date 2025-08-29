import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
};

export default function Select({ children, className = '', id, name, value }: Props) {
  const defaultClassName =
    'flex-1 px-4 py-2 border rounded-sm transition duration-300 focus:outline-none cursor-pointer';

  return (
    <select className={`${defaultClassName} ${className}`} id={id} name={name || id} value={value}>
      {children}
    </select>
  );
}
