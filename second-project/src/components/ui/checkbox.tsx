import { useState, useEffect } from 'react';
import type { MouseEvent, Ref, KeyboardEvent } from 'react';
import type { FormRegister, FormSchema } from '@/types/types';

type Props = {
  checkboxClassName?: string;
  checkClassName?: string;
  dataTestId?: string;
  id?: keyof FormSchema;
  name?: string;
  ref?: Ref<HTMLInputElement>;
  onClick?: () => void;
  checked?: boolean;
  register?: FormRegister;
};

export default function Checkbox({
  checkboxClassName,
  checkClassName,
  dataTestId,
  id,
  name,
  ref,
  onClick,
  checked,
  register,
}: Props) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(false);
  const isChecked = checked !== undefined ? checked : uncontrolledChecked;

  const conditionalProps = register && id ? register(id) : { ref };

  useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      const currentRef = ref.current;
      setUncontrolledChecked(currentRef.checked);

      const handleChange = () => {
        setUncontrolledChecked(currentRef.checked || false);
      };

      currentRef.addEventListener('change', handleChange);

      return () => {
        currentRef.removeEventListener('change', handleChange);
      };
    }
  }, [ref]);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else if (ref && 'current' in ref && ref.current) {
      ref.current.checked = !ref.current.checked;
      setUncontrolledChecked(ref.current.checked);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (onClick) {
        onClick();
      } else if (ref && 'current' in ref && ref.current) {
        ref.current.checked = !ref.current.checked;
        setUncontrolledChecked(ref.current.checked);
      }
    }
  };

  const defaultCheckboxClassName = `
      w-5 h-5 border-2 rounded cursor-pointer transition-all duration-300
      focus:outline-none
    `;

  const defaultCheckClassName = `h-4 w-4 transition-all duration-300`;

  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        name={name || id}
        data-testid={dataTestId}
        className="sr-only"
        tabIndex={-1}
        {...conditionalProps}
      />

      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="checkbox"
        aria-checked={isChecked}
        aria-labelledby={id ? `${id}-label` : undefined}
        className={`${defaultCheckboxClassName} ${checkboxClassName}`}
      >
        {isChecked && (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className={`${defaultCheckClassName} ${checkClassName}`}
              fill="currentColor"
            >
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
