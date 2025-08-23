import type { ReactNode, Ref } from 'react';
import type { FormRegister, FormSchema } from '@/types/types';

type Props = {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
  id?: keyof FormSchema;
  ref?: Ref<HTMLSelectElement>;
  register?: FormRegister;
};

const Select = ({ children, className = '', dataTestId, id, ref, register }: Props) => {
  const defaultClassName =
    'flex-1 px-4 py-2 border rounded-sm transition duration-300 focus:outline-none cursor-pointer';

  const conditionalProps = register && id ? register(id) : { ref };

  return (
    <select
      className={`${defaultClassName} ${className}`}
      data-testid={dataTestId}
      id={id}
      {...conditionalProps}
    >
      {children}
    </select>
  );
};

Select.displayName = 'Select';

export default Select;
