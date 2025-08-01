import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import ErrorBoundary from './components/error-boundary/error-boundary';
import errorImage from './assets/images/error.svg';
import type { ErrorTexts } from './types/interfaces';
import { useLocale } from './hooks/use-locale';

export default function App() {
  const translations = useLocale();

  const errorTexts: ErrorTexts = {
    title: translations.error.title,
    message: translations.error.description,
    buttonText: translations.error.refreshButton,
  };

  return (
    <ErrorBoundary
      texts={errorTexts}
      image={errorImage}
      className="min-h-screen"
      containerClassName="dark:bg-indigo-900 bg-white backdrop-blur-sm dark:text-white text-black-900 flex flex-col min-h-screen"
      imageClassName="w-64 h-64"
      buttonClassName="bg-fuchsia-500 border border-fuchsia-500 hover:bg-fuchsia-400 hover:border-fuchsia-400"
    >
      <Header />
      <div className="text-black-900 flex-1 bg-white px-5 pb-10 lg:px-20 dark:bg-slate-900 dark:text-white">
        <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-center py-5 md:py-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </ErrorBoundary>
  );
}
