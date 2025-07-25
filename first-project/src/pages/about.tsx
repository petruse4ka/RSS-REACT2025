import Contacts from '@/components/contacts/contacts';
import AboutAuthor from '@/components/about/about-author';
import AboutSchool from '@/components/about/about-school';
import { ABOUT_TEXTS } from '@/constants';

export default function About() {
  return (
    <div data-testid="about-page">
      <div>
        <section data-testid="about-header" className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-cyan-300 md:text-5xl">{ABOUT_TEXTS.TITLE}</h2>
          <p className="text-lg text-gray-300">{ABOUT_TEXTS.SUBTITLE}</p>
        </section>
        <AboutAuthor />
        <Contacts />
        <AboutSchool />
      </div>
    </div>
  );
}
