type Props = {
  classNameSpinner: string;
  classNameText: string;
  text: string;
  dataTestId: string;
};

export default function Loader({ classNameSpinner, classNameText, text, dataTestId }: Props) {
  const defaultSpinnerClasses = `w-12 h-12 animate-spin rounded-full border-2 border-t-transparent`;
  const defaultTextClasses = `font-medium`;

  return (
    <div data-testid={dataTestId} className={`flex flex-col items-center justify-center gap-3`}>
      <div
        data-testid="loader-spinner"
        className={`${defaultSpinnerClasses} ${classNameSpinner}`}
      ></div>
      <div data-testid="loader-text" className={`${defaultTextClasses} ${classNameText}`}>
        {text}
      </div>
    </div>
  );
}
