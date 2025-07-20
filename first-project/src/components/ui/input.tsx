import React, { PureComponent } from 'react';

type Props = {
  type: 'text' | 'number';
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className: string;
  dataTestId: string;
};

export default class Input extends PureComponent<Props> {
  render() {
    const { type, placeholder, value, onChange, onKeyDown, className, dataTestId } = this.props;

    const defaultClassName =
      'flex-1 min-w-[200px] px-4 py-2 border rounded-sm transition duration-300 focus:outline-none';

    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`${defaultClassName} ${className}`}
        data-testid={dataTestId}
      />
    );
  }
}
