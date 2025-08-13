import authorImage from '@/assets/images/author.png';
import { useLocale } from '@/hooks/use-locale';

export default function AboutAuthor() {
  const translations = useLocale();

  return (
    <div className="flex flex-col gap-10 xl:flex-row xl:gap-16">
      <div data-testid="about-author-image" className="flex justify-center xl:justify-start">
        <img
          src={authorImage.src}
          alt="Konstantin Petrov photo"
          className="rounded-lg object-cover xl:w-90"
        />
      </div>
      <div data-testid="about-author-description" className="flex flex-1 flex-col justify-start">
        <div className="space-y-6">
          {translations.about.backgroundDescription.map((description, index) => (
            <p
              key={index}
              data-testid={`about-author-description-${index + 1}`}
              className="leading-relaxed text-gray-700 dark:text-gray-300"
            >
              {description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
