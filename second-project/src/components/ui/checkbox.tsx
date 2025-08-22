import { useState, useEffect } from 'react';
import type { MouseEvent, Ref } from 'react';

type Props = {
  checkboxClassName?: string;
  checkClassName?: string;
  dataTestId?: string;
  id?: string;
  ref?: Ref<HTMLInputElement>;
};

export default function Checkbox({
  checkboxClassName,
  checkClassName,
  dataTestId,
  id,
  ref,
}: Props) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      setIsChecked(ref.current.checked);

      const handleChange = () => {
        setIsChecked(ref.current?.checked || false);
      };

      ref.current.addEventListener('change', handleChange);

      return () => {
        ref.current?.removeEventListener('change', handleChange);
      };
    }
  }, [ref]);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (ref && 'current' in ref && ref.current) {
      ref.current.checked = !ref.current.checked;
      setIsChecked(ref.current.checked);
    }
  };

  const defaultCheckboxClassName = `
      w-5 h-5 border-2 rounded cursor-pointer transition-all duration-300
      focus:outline-none
    `;

  const defaultCheckClassName = `h-4 w-4 transition-all duration-300`;

  return (
    <div className="relative">
      <input ref={ref} type="checkbox" id={id} data-testid={dataTestId} className="sr-only" />

      <div onClick={handleClick} className={`${defaultCheckboxClassName} ${checkboxClassName}`}>
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
