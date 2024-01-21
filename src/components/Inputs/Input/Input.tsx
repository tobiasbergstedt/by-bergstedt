import clsx from 'clsx';

import styles from './Input.module.scss';
import { forwardRef, type ChangeEventHandler } from 'react';

interface InputProps {
  className?: string;
  type: string;
  name?: string;
  inputValue: number | string | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: () => void;
  maxLength?: number;
  placeholder: string;
  isFullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      name,
      inputValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      maxLength,
      placeholder,
      isFullWidth = false,
    },
    ref,
  ): JSX.Element => {
    return (
      <input
        className={clsx(styles.input, className)}
        ref={ref}
        type={type}
        name={name ?? ''}
        value={inputValue ?? ''}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxLength}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        style={isFullWidth ? { maxWidth: '100%' } : {}}
      />
    );
  },
);

Input.defaultProps = {
  className: undefined,
  type: 'text',
  ref: null,
  inputValue: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  maxLength: 1000,
  placeholder: '',
};

export default Input;
