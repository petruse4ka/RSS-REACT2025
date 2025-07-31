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
      className="group relative text-3xl font-semibold text-white transition-all duration-300 hover:text-cyan-300 md:text-lg md:font-medium md:hover:drop-shadow-lg"
      data-testid={dataTestId}
      onClick={onClick}
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}
