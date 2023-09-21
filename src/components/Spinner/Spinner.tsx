import clsx from 'clsx';

import styles from './Spinner.module.scss';

interface SpinnerPropTypes {
  className?: string;
  isSmall?: boolean;
  isMedium?: boolean;
  isLarge?: boolean;
}

const Spinner = ({
  className,
  isSmall,
  isMedium,
  isLarge,
}: SpinnerPropTypes): JSX.Element => (
  <div
    className={clsx(className, styles.spinner, {
      [styles.isSmall]: isSmall,
      [styles.isMedium]: isMedium,
      [styles.isLarge]: isLarge,
    })}
  />
);

Spinner.defaultProps = {
  className: null,
  isSmall: false,
  isMedium: false,
  isLarge: false,
};

export default Spinner;
