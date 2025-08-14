import authorImage from '@/assets/images/author.png';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutAuthor() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-10 xl:flex-row xl:gap-16">
      <div data-testid="about-author-image" className="flex justify-center xl:justify-start">
        <Image
          src={authorImage.src}
          alt="Konstantin Petrov photo"
          className="rounded-lg object-cover xl:w-90"
          width={521}
          height={521}
        />
      </div>
      <div data-testid="about-author-description" className="flex flex-1 flex-col justify-start">
        <div className="space-y-6">
          {t.raw('about.backgroundDescription').map((description: string, index: number) => (
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
