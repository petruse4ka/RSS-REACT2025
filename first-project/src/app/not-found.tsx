'use client';

import Button from '../components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import errorImage from '@/assets/images/404-error.png';
import Image from 'next/image';
import { useRouter } from '@/i18n/navigation';

export default function Error404() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const returnHome = () => {
    router.push('/', { locale: locale });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center" data-testid="404-error-page">
      <div className="text-center">
        <h2
          className="mb-4 text-4xl font-bold text-fuchsia-400 md:text-5xl dark:text-cyan-300"
          data-testid="404-error-title"
        >
          {t('error404.title')}
        </h2>

        <Image
          src={errorImage.src}
          alt="404 Error Image"
          className="mx-auto"
          data-testid="404-error-image"
          width={658}
          height={494}
          priority
        />

        <p
          className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          data-testid="404-error-description"
        >
          {t('error404.description')}
        </p>

        <Button
          type="button"
          onClick={returnHome}
          className="mt-10 rounded-lg border-cyan-500 bg-cyan-500 px-2 hover:border-cyan-400 hover:bg-cyan-400 dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400"
          text={t('error404.button')}
          dataTestId="return-homepage-button"
        />
      </div>
    </div>
  );
}
