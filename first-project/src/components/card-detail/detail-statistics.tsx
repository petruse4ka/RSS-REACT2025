import type { CardDetailResponse } from '@/types/interfaces';
import { useLocale } from '@/hooks/use-locale';

type Props = {
  stats: CardDetailResponse['stats'];
};

export default function DetailStatistics({ stats }: Props) {
  const translations = useLocale();

  return (
    <div className="mt-4 sm:mt-6">
      <h4 className="mb-3 text-center text-lg font-semibold text-cyan-600 lg:text-left dark:text-cyan-300">
        {translations.cardDetail.statistics}
      </h4>
      <div className="grid grid-cols-1 gap-2 text-center lg:grid-cols-3 lg:gap-4">
        <div>
          <p className="text-xl font-bold text-sky-500 dark:text-sky-400" data-testid="likes-count">
            {stats.likes.toLocaleString()}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {translations.cardDetail.likes}
          </p>
        </div>
        <div>
          <p
            className="text-xl font-bold text-green-500 dark:text-green-400"
            data-testid="downloads-count"
          >
            {stats.downloads.toLocaleString()}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {translations.cardDetail.downloads}
          </p>
        </div>
        <div>
          <p
            className="text-xl font-bold text-fuchsia-400 dark:text-fuchsia-300"
            data-testid="views-count"
          >
            {stats.views.toLocaleString()}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {translations.cardDetail.views}
          </p>
        </div>
      </div>
    </div>
  );
}
