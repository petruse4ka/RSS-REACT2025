import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button';
import { useLocale } from '../hooks/use-locale';
import errorImage from '../assets/images/404-error.png';

export default function Error404() {
  const navigate = useNavigate();
  const translations = useLocale();

  const returnHome = () => {
    navigate('/');
  };

  return (
    <div className="flex w-full flex-col items-center justify-center" data-testid="404-error-page">
      <div className="text-center">
        <h2
          className="mb-4 text-4xl font-bold text-yellow-300 md:text-5xl"
          data-testid="404-error-title"
        >
          {translations.error404.title}
        </h2>

        <img
          src={errorImage}
          alt="404 Error Image"
          className="mx-auto max-w-[900px]"
          data-testid="404-error-image"
        />

        <p
          className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          data-testid="404-error-description"
        >
          {translations.error404.description}
        </p>

        <Button
          type="button"
          onClick={returnHome}
          className="mt-10 rounded-lg border-cyan-500 bg-cyan-500 px-2 hover:border-cyan-400 hover:bg-cyan-400 dark:border-yellow-300 dark:bg-yellow-300 dark:hover:border-yellow-400 dark:hover:bg-yellow-400"
          text={translations.error404.button}
          dataTestId="return-homepage-button"
        />
      </div>
    </div>
  );
}
