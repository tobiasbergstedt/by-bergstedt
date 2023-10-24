import { useTranslation } from 'react-i18next';

import Spinner from '@components/Spinner/Spinner';

import styles from './Loading.module.scss';

const Loading = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.loading}>
      <p>{t('misc.loading')}</p>
      <Spinner isLarge />
    </div>
  );
};

export default Loading;
