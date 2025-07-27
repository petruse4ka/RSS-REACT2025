import rsSchoolLogo from '@/assets/images/rs-school-logo.svg';
import { ABOUT_TEXTS } from '@/constants';

export default function AboutSchool() {
  return (
    <section data-testid="about-school" className="mt-16 text-center">
      <h3
        data-testid="about-school-title"
        className="mb-8 text-center text-3xl font-semibold text-cyan-300"
      >
        {ABOUT_TEXTS.LEARNING_JOURNEY_TITLE}
      </h3>
      <p data-testid="about-school-description" className="mb-8 leading-relaxed text-gray-300">
        {ABOUT_TEXTS.LEARNING_JOURNEY_DESCRIPTION}
      </p>
      <a
        data-testid="about-school-link"
        href={ABOUT_TEXTS.RS_SCHOOL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 rounded-lg bg-fuchsia-500 px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-fuchsia-400 lg:gap-6"
      >
        <img
          data-testid="about-school-logo"
          src={rsSchoolLogo}
          alt="RS School logo"
          className="h-12 w-12"
        />
        <span
          data-testid="about-school-button"
          className="text-base font-semibold text-white md:text-lg"
        >
          {ABOUT_TEXTS.RS_SCHOOL_BUTTON}
        </span>
      </a>
    </section>
  );
}
