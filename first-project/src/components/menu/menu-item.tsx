import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  dataTestId?: string;
};

export default function MenuItem({ href, children, dataTestId }: Props) {
  return (
    <a
      href={href}
      className="text-white transition-all duration-300 hover:text-cyan-300"
      data-testid={dataTestId}
    >
      {children}
    </a>
  );
}
