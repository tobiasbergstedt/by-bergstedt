import { type RadioComponentProps } from '@interfaces/interfaces';
import { type ChangeEvent } from 'react';

import styles from './Radio.module.scss';

const Radio = ({
  options,
  selectedOption,
  onOptionChange,
}: RadioComponentProps): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onOptionChange(event.target.value);
  };

  return (
    <div className={styles.radioContainer}>
      {options.map((option, index) => (
        <label
          key={index}
          className={`${styles.radioLabel} ${
            selectedOption === option.value ? styles.selected : ''
          }`}
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleChange}
            className={styles.radioInput}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Radio;
