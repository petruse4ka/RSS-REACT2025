import HomePage from './pages/homepage';
import ErrorBoundary from './components/error-boundary/error-boundary';
import errorImage from './assets/images/error.svg';
import type { ErrorTexts } from './types/interfaces';
import { ERROR_TEXTS } from './constants';

const errorTexts: ErrorTexts = {
  title: ERROR_TEXTS.TITLE,
  message: ERROR_TEXTS.DESCRIPTION,
  buttonText: ERROR_TEXTS.REFRESH_BUTTON,
};

export default function App() {
  return (
    <ErrorBoundary
      texts={errorTexts}
      image={errorImage}
      className="min-h-screen px-5 md:px-20"
      containerClassName="bg-indigo-900 backdrop-blur-sm text-white"
      imageClassName="w-64 h-64"
      buttonClassName="bg-fuchsia-500 border border-fuchsia-500 hover:bg-fuchsia-400 hover:border-fuchsia-400"
    >
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-center px-5 py-20 md:px-20">
        <HomePage />
      </div>
    </ErrorBoundary>
  );
}
