import { PureComponent } from 'react';

type props = {
  classNameSpinner: string;
  classNameText: string;
  text: string;
};

export default class Loader extends PureComponent<props> {
  render() {
    const { classNameSpinner, classNameText, text } = this.props;
    const defaultSpinnerClasses = `w-12 h-12 animate-spin rounded-full border-2 border-t-transparent`;
    const defaultTextClasses = `font-medium`;

    return (
      <div className={`flex flex-col items-center justify-center gap-3`}>
        <div className={`${defaultSpinnerClasses} ${classNameSpinner}`}></div>
        <div className={`${defaultTextClasses} ${classNameText}`}>{text}</div>
      </div>
    );
  }
}
