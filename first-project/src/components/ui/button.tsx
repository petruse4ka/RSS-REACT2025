import { PureComponent } from 'react';

type props = {
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  className: string;
  text: string;
};

export default class Button extends PureComponent<props> {
  render() {
    const { type, onClick, className, text } = this.props;

    const defaultClassName =
      'px-6 py-2 text-white rounded-sm transition duration-300 cursor-pointer focus:outline-none';

    return (
      <button type={type} onClick={onClick} className={`${defaultClassName} ${className}`}>
        {text}
      </button>
    );
  }
}
