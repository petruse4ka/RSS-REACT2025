import React, { PureComponent } from 'react';

type props = {
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  className: string;
  children: React.ReactNode;
};

export default class Button extends PureComponent<props> {
  render() {
    const { type, onClick, className, children } = this.props;

    const defaultClassName =
      'px-6 py-2 text-white rounded-sm transition cursor-pointer focus:outline-none';

    return (
      <button type={type} onClick={onClick} className={`${defaultClassName} ${className}`}>
        {children}
      </button>
    );
  }
}
