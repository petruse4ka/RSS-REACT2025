import { useLocale } from '../hooks/use-locale';

export default function HomePage() {
  const translations = useLocale();

  return (
    <div data-testid="homepage" className="flex w-full flex-col">
      <h1>{translations.homepage.title}</h1>
    </div>
  );
}
