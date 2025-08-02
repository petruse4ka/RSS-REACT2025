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
      className="flex flex-row items-center justify-between gap-4 sm:gap-0"
    >
      <h2
        data-testid="detail-title"
        className="text-base text-cyan-600 sm:text-2xl dark:text-white"
      >
        {translations.cardDetail.title}
      </h2>
      <Button
        type="button"
        onClick={handleClose}
        className="self-end border-cyan-500 bg-cyan-500 px-4 hover:border-cyan-400 hover:bg-cyan-400 sm:self-center dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400"
        text="x"
        dataTestId="close-detail-button"
      />
    </div>
  );
}
