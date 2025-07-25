import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/button';
import { ERROR_404_TEXTS } from '../constants';
import errorImage from '../assets/images/404-error.png';

export default function Error404() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center" data-testid="404-error-page">
      <div className="text-center">
        <h2
          className="mb-4 text-4xl font-bold text-cyan-300 md:text-5xl"
          data-testid="404-error-title"
        >
          {ERROR_404_TEXTS.TITLE}
        </h2>

        <img
          src={errorImage}
          alt="404 Error Image"
          className="mx-auto"
          data-testid="404-error-image"
        />

        <p
          className="mt-2text-lg leading-relaxed text-gray-300"
          data-testid="404-error-description"
        >
          {ERROR_404_TEXTS.DESCRIPTION}
        </p>

        <Button
          type="button"
          onClick={returnHome}
          className="mt-10 rounded-lg bg-indigo-900 py-3 hover:bg-indigo-800"
          text={ERROR_404_TEXTS.BUTTON}
          dataTestId="404-error-button"
        />
      </div>
    </div>
  );
}
