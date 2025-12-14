import type { KeyboardEvent } from 'react';

type Props = {
  checkboxClassName?: string;
  checkClassName?: string;
  dataTestId?: string;
  id?: string;
  name?: string;
  onClick?: () => void;
  checked?: boolean;
};

export default function Checkbox({
  checkboxClassName,
  checkClassName,
  dataTestId,
  id,
  name,
  onClick,
  checked,
}: Props) {
  const isChecked = checked !== undefined ? checked : false;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
    }
  };

  const defaultCheckboxClassName = `
      w-5 h-5 border-2 rounded cursor-pointer transition-all duration-300
      focus:outline-none
    `;

  const defaultCheckClassName = `h-4 w-4 transition-all duration-300`;

  return (
    <div className="relative" onClick={onClick}>
      <input
        type="checkbox"
        id={id}
        name={name || id}
        data-testid={dataTestId}
        className="sr-only"
        tabIndex={-1}
      />

      <div
        onClick={onClick}
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
