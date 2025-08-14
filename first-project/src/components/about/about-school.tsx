import rsSchoolLogo from '@/assets/images/rs-school-logo.svg';
import { RS_SCHOOL_URL } from '@/constants';
import { useLocale } from '@/hooks/use-locale';
import Image from 'next/image';

export default function AboutSchool() {
  const translations = useLocale();

  return (
    <section data-testid="about-school" className="mt-16 text-center">
      <h3
        data-testid="about-school-title"
        className="mb-8 text-center text-3xl font-semibold text-fuchsia-400 dark:text-cyan-300"
      >
        {translations.about.learningJourneyTitle}
      </h3>
      <p
        data-testid="about-school-description"
        className="mb-8 leading-relaxed text-gray-700 dark:text-gray-300"
      >
        {translations.about.learningJourneyDescription}
      </p>
      <a
        data-testid="about-school-link"
        href={RS_SCHOOL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 rounded-lg bg-cyan-500 px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-cyan-400 lg:gap-6 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-400"
      >
        <Image
          data-testid="about-school-logo"
          src={rsSchoolLogo.src}
          alt="RS School logo"
          width={48}
          height={48}
        />
        <span
          data-testid="about-school-button"
          className="text-base font-semibold text-white md:text-lg"
        >
          {translations.about.rsSchoolButton}
        </span>
      </a>
    </section>
  );
}
