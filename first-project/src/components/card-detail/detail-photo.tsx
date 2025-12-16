import { useLocale } from '@/hooks/use-locale';

type Props = {
  imageUrl: string;
  title: string;
  description: string;
};

export default function DetailPhoto({ imageUrl, title, description }: Props) {
  const translations = useLocale();

  const displayTitle = title || translations.cardDetail.untitled;
  const displayDescription = description || translations.cardDetail.noDescription;

  return (
    <div className="mt-6">
      <div className="mb-4 sm:mb-6">
        <img
          src={imageUrl}
          alt={displayTitle}
          className="w-full rounded-lg shadow-lg"
          data-testid="detail-image"
        />
      </div>

      <div className="mb-2 sm:mb-5">
        <h3
          className="mb-2 text-xl leading-relaxed font-semibold text-cyan-600 dark:text-cyan-300"
          data-testid="detail-title"
        >
          {displayTitle}
        </h3>
        <p data-testid="detail-description" className="text-gray-700 dark:text-gray-300">
          {displayDescription}
        </p>
      </div>
    </div>
  );
}
