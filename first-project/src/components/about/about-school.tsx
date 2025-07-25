import rsSchoolLogo from '@/assets/images/rs-school-logo.svg';
import { ABOUT_TEXTS } from '@/constants';

export default function AboutSchool() {
  return (
    <section data-testid="about-school" className="mt-16 text-center">
      <h3 className="mb-8 text-center text-3xl font-semibold text-cyan-300">
        {ABOUT_TEXTS.LEARNING_JOURNEY_TITLE}
      </h3>
      <p className="mb-8 leading-relaxed text-gray-300">
        {ABOUT_TEXTS.LEARNING_JOURNEY_DESCRIPTION}
      </p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center gap-3 rounded-lg bg-indigo-900 px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-indigo-800 lg:gap-6"
      >
        <img src={rsSchoolLogo} alt="RS School logo" className="h-12 w-12" />
        <span className="text-base font-semibold text-white group-hover:text-cyan-300 md:text-lg">
          {ABOUT_TEXTS.RS_SCHOOL_BUTTON}
        </span>
      </a>
    </section>
  );
}
