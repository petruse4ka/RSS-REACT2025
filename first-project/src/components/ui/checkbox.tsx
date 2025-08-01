import type { MouseEvent, KeyboardEvent } from 'react';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  checkboxClassName?: string;
  checkClassName?: string;
}

export default function Checkbox({ checked, onChange, checkboxClassName, checkClassName }: Props) {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onChange(!checked);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.stopPropagation();
      e.preventDefault();
      onChange(!checked);
    }
  };

  const defaultCheckboxClassName = `
      w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200
      focus:outline-none
    `;

  const defaultCheckClassName = `h-4 w-4`;

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`${defaultCheckboxClassName} ${checkboxClassName}`}
    >
      {checked && (
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
  );
}
