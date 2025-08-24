import { useEffect } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import Button from './button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  dataTestId?: string;
};

export default function Modal({ isOpen, onClose, children, title, dataTestId }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscKey);

      return () => {
        document.removeEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const modalRoot = document.getElementById('modal-root');

  return modalRoot
    ? createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80"
          onMouseDown={handleOutsideClick}
          data-testid={dataTestId}
        >
          <div
            className="mx-4 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg bg-stone-100 shadow-xl dark:bg-indigo-900"
            aria-modal="true"
            aria-labelledby="form-modal"
            tabIndex={-1}
            role="dialog"
          >
            {title && (
              <div className="flex flex-shrink-0 items-center justify-between border-b border-stone-200 p-4 dark:border-indigo-800">
                <h2
                  id="form-modal"
                  className="text-lg font-semibold text-cyan-500 dark:text-yellow-300"
                >
                  {title}
                </h2>
                <Button
                  onClick={onClose}
                  className="text-2xl text-yellow-300 hover:text-yellow-400 focus:text-yellow-400 dark:text-cyan-500 dark:hover:text-cyan-400 dark:focus:text-cyan-400"
                  text="✕"
                  dataTestId="modal-close-btn"
                />
              </div>
            )}
            <div className="m-4 flex-1 overflow-y-auto px-5">{children}</div>
          </div>
        </div>,
        modalRoot
      )
    : null;
}
