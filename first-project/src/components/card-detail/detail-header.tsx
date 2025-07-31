import Button from '../ui/button';
import { useLocale } from '@/hooks/use-locale';

type Props = {
  handleClose: () => void;
};

export default function DetailHeader({ handleClose }: Props) {
  const translations = useLocale();

  return (
    <div
      data-testid="detail-header"
      className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:gap-0"
    >
      <h2 data-testid="detail-title" className="text-base font-bold sm:text-2xl">
        {translations.cardDetail.title}
      </h2>
      <Button
        type="button"
        onClick={handleClose}
        className="self-end border-fuchsia-500 bg-fuchsia-500 px-4 hover:border-fuchsia-400 hover:bg-fuchsia-400 sm:self-center"
        text="x"
        dataTestId="close-detail-button"
      />
    </div>
  );
}
