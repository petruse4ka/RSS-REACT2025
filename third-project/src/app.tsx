import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import ErrorBoundary from './components/error-boundary';
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
      className="min-h-screen bg-zinc-50 dark:bg-zinc-950"
      containerClassName="bg-zinc-100 dark:bg-zinc-800 backdrop-blur-sm text-gray-900 dark:text-white flex flex-col"
      imageClassName="w-64 h-64"
      buttonClassName="bg-scooter-500 border border-scooter-500 hover:bg-scooter-400 hover:border-scooter-400 dark:bg-shamrock-400 dark:border-shamrock-400 dark:hover:bg-shamrock-500 dark:hover:border-shamrock-500 transition-colors duration-300"
    >
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="dark:text-shamrock-100 flex-1 bg-zinc-50 px-5 pb-10 text-gray-500 lg:px-20 dark:bg-zinc-950">
          <div className="mx-auto flex max-w-[1440px] grow-1 flex-col items-center py-5 md:py-10">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
