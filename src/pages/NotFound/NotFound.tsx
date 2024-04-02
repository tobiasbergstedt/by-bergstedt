import { useTranslation } from 'react-i18next';

import styles from './NotFound.module.scss';

const NotFound = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <h1>{t('notFound.404')}</h1>
      {t('notFound.errorMessage')}
    </div>
  );
};

export default NotFound;
