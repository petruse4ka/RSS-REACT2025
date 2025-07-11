import React, { PureComponent } from 'react';

interface props {
  type: 'text' | 'number';
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

export default class Input extends PureComponent<props> {
  render() {
    const { type, placeholder, value, onChange, className } = this.props;

    const defaultClassName =
      'flex-1 min-w-[200px] px-4 py-2 border rounded-sm transition focus:outline-none';

    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${defaultClassName} ${className}`}
      />
    );
  }
}
