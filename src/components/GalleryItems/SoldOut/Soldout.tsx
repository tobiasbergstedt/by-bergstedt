import { useTranslation } from 'react-i18next';
import styles from './Soldout.module.scss';

const SoldOut = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.soldOutWrapper}>
      <p className={styles.soldOutText}>{t('gallery.soldOut')}</p>
    </div>
  );
};

export default SoldOut;
