import { PureComponent } from 'react';
import Search from './components/search/search';
import Main from './components/main/main';
import ErrorBoundary from './components/error-boundary/error-boundary';
import errorImage from './assets/images/error.svg';
import type { ErrorTexts } from './types/interfaces';
import { ERROR_TEXTS } from './constants';

const errorTexts: ErrorTexts = {
  title: ERROR_TEXTS.TITLE,
  message: ERROR_TEXTS.DESCRIPTION,
  buttonText: ERROR_TEXTS.REFRESH_BUTTON,
};

export default class App extends PureComponent {
  render() {
    return (
      <ErrorBoundary
        texts={errorTexts}
        image={errorImage}
        className="min-h-screen px-5 md:px-20"
        containerClassName="bg-fuchsia-500 backdrop-blur-sm text-white"
        imageClassName="w-64 h-64"
        buttonClassName="bg-cyan-400 border border-cyan-400 hover:bg-cyan-300 hover:border-cyan-300"
      >
        <div className="min-h-screen flex flex-col items-center max-w-[1440px] mx-auto py-20 px-5 md:px-20">
          <Search />
          <Main />
        </div>
      </ErrorBoundary>
    );
  }
}
