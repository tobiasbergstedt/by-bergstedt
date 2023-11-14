import clsx from 'clsx';

import styles from './Input.module.scss';

interface InputProps {
  className: string;
  type: string;
  inputRef: any;
  inputValue: number;
  onChange: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: () => void;
  maxLength: number;
  placeholder: string;
}

const Input = ({
  className,
  type,
  inputRef,
  inputValue,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  maxLength,
  placeholder,
}: InputProps): JSX.Element => {
  return (
    <input
      className={clsx(styles.input, className)}
      ref={inputRef}
      type={type}
      value={inputValue}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={maxLength}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

Input.defaultProps = {
  className: null,
  type: 'text',
  inputRef: null,
  inputValue: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  maxLength: 1000,
  placeholder: '',
};

export default Input;
