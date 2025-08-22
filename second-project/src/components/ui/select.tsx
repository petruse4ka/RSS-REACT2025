import type { ReactNode, Ref } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
  id?: string;
  ref?: Ref<HTMLSelectElement>;
};

export default function Select({ children, className = '', dataTestId, id, ref }: Props) {
  return (
    <select ref={ref} className={className} data-testid={dataTestId} id={id}>
      {children}
    </select>
  );
}
