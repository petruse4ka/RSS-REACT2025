import Contacts from '@/components/contacts/contacts';
import AboutAuthor from '@/components/about/about-author';
import AboutSchool from '@/components/about/about-school';
import { useLocale } from '@/hooks/use-locale';

export default function About() {
  const translations = useLocale();

  return (
    <div data-testid="about-page" className="w-full">
      <div>
        <section data-testid="about-header" className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-cyan-300 md:text-5xl">
            {translations.about.title}
          </h2>
          <p className="text-lg text-gray-300">{translations.about.subtitle}</p>
        </section>
        <AboutAuthor />
        <Contacts />
        <AboutSchool />
      </div>
    </div>
  );
}
