import React, { Component } from 'react';
import type { ReactNode } from 'react';
import Button from '../ui/button';
import type { ErrorTexts } from '@/types/interfaces';

type Props = {
  children: ReactNode;
  texts: ErrorTexts;
  image?: string;
  className?: string;
  imageClassName?: string;
  containerClassName?: string;
  buttonClassName?: string;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error);
    console.error('Error info:', errorInfo);
  }

  render() {
    const handleRefresh = () => {
      window.location.reload();
    };

    if (this.state.hasError) {
      const { title, message, buttonText } = this.props.texts;
      const { image, className, imageClassName, containerClassName, buttonClassName } = this.props;

      return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
          <div className={`rounded-lg shadow-lg p-8 text-center ${containerClassName}`}>
            {image && (
              <div className="mb-6">
                <img
                  src={image}
                  alt="Error image"
                  className={`mx-auto object-contain ${imageClassName}`}
                />
              </div>
            )}
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="mb-6">{message}</p>
            <Button
              type="button"
              onClick={handleRefresh}
              className={`${buttonClassName}`}
              text={buttonText}
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
