import type { CardDetailResponse } from '@/types/interfaces';
import { useLocale } from '@/hooks/use-locale';

type Props = {
  author: CardDetailResponse['author'];
};

export default function DetailAuthor({ author }: Props) {
  const translations = useLocale();

  return (
    <div className="mt-4 sm:mt-6">
      <h4 className="mb-3 text-center text-lg font-semibold text-cyan-600 lg:text-left dark:text-cyan-300">
        {translations.cardDetail.author}
      </h4>
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <img
          src={author.profileImage}
          alt={author.name}
          className="h-12 w-12 self-center rounded-full lg:self-start"
          data-testid="author-image"
        />
        <div className="flex flex-col items-center gap-1 self-center text-center lg:items-start lg:self-start lg:text-left">
          <p className="font-medium text-gray-900 dark:text-white" data-testid="author-name">
            {author.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300" data-testid="author-username">
            @{author.username}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300" data-testid="author-bio">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
