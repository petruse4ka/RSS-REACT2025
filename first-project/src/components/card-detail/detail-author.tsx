import type { CardDetailResponse } from '@/types/interfaces';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Props = {
  author: CardDetailResponse['author'];
};

export default function DetailAuthor({ author }: Props) {
  const t = useTranslations();

  const displayName = author.name || t('cardDetail.unknownAuthor');
  const displayUsername = author.username || t('cardDetail.unknownUsername');
  const displayBio = author.bio || t('cardDetail.noBio');

  return (
    <div className="mt-4 sm:mt-6">
      <h4 className="mb-3 text-left text-lg font-semibold text-cyan-600 dark:text-cyan-300">
        {t('cardDetail.author')}
      </h4>
      <div className="flex flex-row items-start gap-4">
        <Image
          src={author.profileImage}
          alt={displayName}
          className="self-start rounded-full"
          data-testid="author-image"
          width={48}
          height={48}
        />
        <div className="flex flex-col items-start gap-1 self-start text-left">
          <p className="font-medium text-gray-900 dark:text-white" data-testid="author-name">
            {displayName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300" data-testid="author-username">
            @{displayUsername}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300" data-testid="author-bio">
            {displayBio}
          </p>
        </div>
      </div>
    </div>
  );
}
