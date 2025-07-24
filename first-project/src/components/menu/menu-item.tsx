import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  dataTestId?: string;
  onClick?: () => void;
};

export default function MenuItem({ href, children, dataTestId, onClick }: Props) {
  return (
    <a
      href={href}
      className="text-2xl text-white transition-all duration-300 hover:text-cyan-300 md:text-base"
      data-testid={dataTestId}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
