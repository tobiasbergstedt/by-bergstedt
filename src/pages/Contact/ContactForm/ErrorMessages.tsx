import { ReactComponent as FailIcon } from '@assets/icons/message-failed.svg';
import styles from './ErrorMessages.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const ErrorMessages = ({ errors }: { errors: any }): JSX.Element => {
  // const errorsNoHoneypot = errors.slice(0, 3);
  // console.log(errors.name);
  const [animate, setAnimate] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setAnimate(false);
      setTimeout(() => {
        setAnimate(true);
      }, 10); // Delay to ensure re-render
    }
  }, [errors]);

  return (
    <div className={styles.errorMessagesContainer}>
      {Object.entries(errors).map(([key, value]: any) =>
        value.length !== 0 ? (
          <div
            className={clsx(styles.errorContainer, {
              [styles.animateError]: animate,
            })}
            key={key}
          >
            <FailIcon className={styles.errorIcon} />
            <p className={styles.errorMessage}>{t(value)}</p>
          </div>
        ) : null,
      )}
    </div>
  );
};

export default ErrorMessages;
