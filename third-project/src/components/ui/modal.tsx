import { useEffect } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import Button from './button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export default function Modal({ isOpen, onClose, children, title }: Props) {
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
        >
          <div
            className="mx-4 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg bg-zinc-100 shadow-xl dark:bg-zinc-900"
            aria-modal="true"
            aria-labelledby="form-modal"
            tabIndex={-1}
            role="dialog"
          >
            {title && (
              <div className="flex flex-shrink-0 items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-700">
                <h2
                  id="form-modal"
                  className="text-shamrock-400 dark:text-scooter-400 text-lg font-semibold"
                >
                  {title}
                </h2>
                <Button
                  onClick={onClose}
                  className="dark:text-scooter-500 dark:hover:text-scooter-400 dark:focus:text-scooter-400 text-shamrock-400 hover:text-shamrock-500 focus:text-shamrock-500 text-2xl"
                  text="✕"
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
