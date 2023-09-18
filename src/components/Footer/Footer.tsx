import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

const MyFooter = (): JSX.Element => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <p className={styles.footer}>
      {t('header.copyright', { thisYear: currentYear })}
    </p>
  );
};

export default MyFooter;
