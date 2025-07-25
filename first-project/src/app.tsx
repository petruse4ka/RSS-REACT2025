import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
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
      className="min-h-screen"
      containerClassName="bg-indigo-900 backdrop-blur-sm text-white flex flex-col min-h-screen"
      imageClassName="w-64 h-64"
      buttonClassName="bg-fuchsia-500 border border-fuchsia-500 hover:bg-fuchsia-400 hover:border-fuchsia-400"
    >
      <Header />
      <div className="flex-1 px-5 md:px-20">
        <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-center py-20">
          <Outlet />
        </div>
      </div>
      <Footer />
    </ErrorBoundary>
  );
}
