import type { ReactNode } from 'react';
import Field from '@/components/ui/field';

type Props = {
  label: string;
  error?: string;
  dataTestId: string;
  children: ReactNode;
  countries: Array<{ name: string; code: string; iso: string }>;
};

export default function CountryField({ label, error, dataTestId, children, countries }: Props) {
  return (
    <Field label={label} htmlFor="country" error={error} dataTestId={dataTestId}>
      {children}
      <datalist id="countries">
        {countries.map((country) => (
          <option key={`${country.code}-${country.iso}`} value={country.name} />
        ))}
      </datalist>
    </Field>
  );
}
