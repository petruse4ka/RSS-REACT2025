import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { clearAllItems } from '@/store/selected-cards-slice';
import { selectSelectedCount, selectSelectedItems } from '@/store/selectors';
import Button from '@/components/ui/button';
import { DownloadLink } from '@/components/cards-list/download-link';
import { useTranslations } from 'next-intl';

export default function SelectedCards() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectSelectedCount);
  const selectedCards = useAppSelector(selectSelectedItems);
  const t = useTranslations();

  const handleUnselectAll = () => {
    dispatch(clearAllItems());
  };

  return (
    <div
      data-testid="selected-cards"
      className={`fixed right-0 bottom-0 left-0 z-25 bg-slate-200 px-5 shadow-lg transition-all duration-300 lg:px-20 dark:bg-sky-600 ${
        count > 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-[1440px] py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xl font-medium text-cyan-600 dark:text-white">
              {`${t('selectedCards.itemsSelected')}: ${count}`}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <DownloadLink
              cards={selectedCards}
              filename={`${count}_items.csv`}
              text={t('selectedCards.download')}
              className="border border-cyan-500 bg-cyan-500 hover:border-cyan-400 hover:bg-cyan-400 dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400"
              dataTestId="download-button"
            />

            <Button
              type="button"
              onClick={handleUnselectAll}
              className="border border-red-500 bg-red-500 hover:border-red-400 hover:bg-red-400"
              text={t('selectedCards.unselectAll')}
              dataTestId="unselect-all-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
