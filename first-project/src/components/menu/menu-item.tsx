import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Props = {
  to: string;
  children: ReactNode;
  dataTestId?: string;
  onClick?: () => void;
};

export default function MenuItem({ to, children, dataTestId, onClick }: Props) {
  return (
    <Link
      to={to}
      className="text-2xl text-white transition-all duration-300 hover:text-cyan-300 md:text-base"
      data-testid={dataTestId}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
