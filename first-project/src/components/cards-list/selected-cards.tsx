import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { clearAllItems } from '@/store/selected-cards-slice';
import Button from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';

export default function SelectedCards() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.selectedCards.count);
  const translations = useLocale();

  const handleUnselectAll = () => {
    dispatch(clearAllItems());
  };

  const handleDownload = () => {
    console.log('File downloaded');
  };

  return (
    <div
      data-testid="selected-cards"
      className={`fixed right-0 bottom-0 left-0 z-25 bg-slate-200 px-5 shadow-lg transition-all duration-300 lg:px-20 dark:bg-sky-600 ${
        count > 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-[1440px] py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-medium text-gray-700 dark:text-white">
              {`${translations.selectedCards.itemsSelected}: ${count}`}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button
              type="button"
              onClick={handleDownload}
              className="border border-cyan-500 bg-cyan-500 hover:border-cyan-400 hover:bg-cyan-400 dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400"
              text={translations.selectedCards.download}
              dataTestId="download-button"
            />

            <Button
              type="button"
              onClick={handleUnselectAll}
              className="border border-red-500 bg-red-500 hover:border-red-400 hover:bg-red-400"
              text={translations.selectedCards.unselectAll}
              dataTestId="unselect-all-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
