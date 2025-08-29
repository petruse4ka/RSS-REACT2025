import { createPortal } from 'react-dom';

type Props = {
  text: string;
  coords: { left: number; top: number };
};

export default function Tooltip({ text, coords }: Props) {
  const { left, top } = coords;
  const tooltipRoot = document.getElementById('tooltip-root');

  return tooltipRoot
    ? createPortal(
        <div
          className="bg-shamrock-400 dark:bg-scooter-400 fixed z-50 max-w-xs rounded-md px-3 py-2 text-center text-sm text-white"
          style={{ left, top }}
        >
          {text}
        </div>,
        tooltipRoot
      )
    : null;
}
