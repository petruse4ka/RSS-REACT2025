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
      className="min-h-screen bg-stone-100 dark:bg-slate-900"
      containerClassName="bg-white dark:bg-indigo-900 backdrop-blur-sm text-gray-900 dark:text-white flex flex-col"
      imageClassName="w-64 h-64"
      buttonClassName="bg-cyan-500 border border-cyan-500 hover:bg-cyan-400 hover:border-cyan-400 dark:bg-yellow-300 dark:border-yellow-300 dark:hover:bg-yellow-400 dark:hover:border-yellow-400"
    >
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 bg-stone-100 px-5 pb-10 text-gray-500 lg:px-20 dark:bg-slate-900 dark:text-gray-100">
          <div className="mx-auto flex max-w-[1440px] grow-1 flex-col items-center py-5 md:py-10">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
