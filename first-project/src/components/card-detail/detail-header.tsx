import Button from '../ui/button';
import { CARD_DETAIL_TEXTS } from '@/constants';

type Props = {
  onClose: () => void;
};

export default function DetailHeader({ onClose }: Props) {
  return (
    <div
      data-testid="detail-header"
      className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:gap-0"
    >
      <h2 data-testid="detail-title" className="text-base font-bold sm:text-2xl">
        {CARD_DETAIL_TEXTS.TITLE}
      </h2>
      <Button
        type="button"
        onClick={onClose}
        className="self-end border-fuchsia-500 bg-fuchsia-500 px-4 hover:border-fuchsia-400 hover:bg-fuchsia-400 sm:self-center"
        text="x"
        dataTestId="close-detail-button"
      />
    </div>
  );
}
