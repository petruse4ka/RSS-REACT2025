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
        <img
          src={errorImage}
          alt="404 Error Image"
          className="mx-auto w-full max-w-[900px]"
          data-testid="404-error-image"
        />
        <p
          className="dark:text-shamrock-100 mt-2 text-lg leading-relaxed text-gray-700"
          data-testid="404-error-description"
        >
          {translations.error404.description}
        </p>
        <Button
          onClick={returnHome}
          className="bg-scooter-500 hover:bg-scooter-400 dark:bg-shamrock-400 dark:hover:bg-shamrock-500 mt-10"
          text={translations.error404.button}
        />
      </div>
    </div>
  );
}
