import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  label: string;
};

export default function AcceptTerms({ children, label }: Props) {
  return (
    <div className="mt-1 flex items-start">
      {children}
      <div className="ml-3 text-sm text-black dark:text-white">
        <label htmlFor="acceptTerms" className="font-medium">
          {label}
        </label>
      </div>
    </div>
  );
}
