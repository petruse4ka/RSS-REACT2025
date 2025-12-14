import type { ReactNode } from 'react';

interface Props {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
  dataTestId?: string;
}

export default function Field({
  label,
  htmlFor,
  error,
  children,
  className = '',
  dataTestId,
}: Props) {
  return (
    <div className={className} data-testid={dataTestId}>
      <label htmlFor={htmlFor} className="text-sm text-cyan-500 dark:text-yellow-300">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
