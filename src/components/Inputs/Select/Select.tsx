import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './Select.module.scss';

interface Options {
  value: string | number;
  label: string;
}

interface PropTypes {
  className?: string;
  onChange: (selectedValue: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label: string;
  all?: string;
  defaultValue?: string | number | null;
  options: Options[];
  isSmall?: boolean;
}

const Select = forwardRef<HTMLSelectElement | null, PropTypes>(
  (
    {
      className,
      onChange,
      onFocus,
      onBlur,
      label,
      all,
      options,
      isSmall,
      defaultValue,
    },
    ref,
  ): JSX.Element => {
    const selectRef = ref as React.MutableRefObject<HTMLSelectElement | null>;

    return (
      <label
        className={clsx(styles.label, {
          [styles.labelIsSmall]: isSmall,
        })}
      >
        <select
          ref={selectRef}
          className={clsx(styles.select, className, {
            [styles.isSmall]: isSmall,
          })}
          onChange={() => {
            if (selectRef.current != null) {
              onChange(selectRef.current.value);
            }
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          name={label}
          defaultValue={defaultValue ?? options[0].value}
        >
          <option value={options[0].value} disabled hidden>
            {label}
          </option>
          {all != null && <option>{all}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  },
);

export default Select;
