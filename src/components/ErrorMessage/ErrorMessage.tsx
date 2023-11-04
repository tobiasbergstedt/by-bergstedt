import { ReactComponent as ErrorIcon } from '@assets/icons/error.svg';

import styles from './ErrorMessage.module.scss';

interface PassedProps {
  errorMessage: string;
  identifier?: string | undefined;
}

const ErrorMessage = ({
  errorMessage,
  identifier,
}: PassedProps): JSX.Element => {
  return (
    <div className={styles.errorContainer}>
      <ErrorIcon className={styles.errorIcon} />
      <h1>{identifier}</h1>
      {identifier != null && <p>{errorMessage}</p>}
    </div>
  );
};

export default ErrorMessage;
