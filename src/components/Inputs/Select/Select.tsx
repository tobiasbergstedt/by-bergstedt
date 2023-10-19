import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './Select.module.scss';

interface Options {
  value: string;
  label: string;
}

interface PropTypes {
  className?: string;
  onChange: (selectedValue: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label: string;
  all?: string;
  options: Options[];
  isSmall?: boolean;
}

const Select = forwardRef<HTMLSelectElement | null, PropTypes>(
  (
    { className, onChange, onFocus, onBlur, label, all, options, isSmall },
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
          ref={ref}
          className={clsx(styles.select, className, {
            [styles.isSmall]: isSmall,
          })}
          onChange={() => {
            if (selectRef.current != null) {
              onChange(selectRef.current.value);
            } // Pass the selected value to onChange
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          name={label}
          defaultValue={'default'}
        >
          <option value="default" disabled hidden>
            {label}
          </option>
          {all != null && <option>{all}</option>}
          {options.map(
            (
              option, // Map over the 'options' array
            ) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ),
          )}
        </select>
      </label>
    );
  },
);

export default Select;
