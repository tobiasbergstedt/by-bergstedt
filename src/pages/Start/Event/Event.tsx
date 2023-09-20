import { useTranslation } from 'react-i18next';

import Button from '../../../components/Button/Button';

import styles from './Event.module.scss';

interface EventProps {
  title: string;
  description: string;
  linkTo: string;
}

const Event = ({ title, description, linkTo }: EventProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <article className={styles.eventContainer}>
      <h4 className={styles.heading}>{title}</h4>

      <p className={styles.paragraph}>{description}</p>
      <Button to={linkTo}>{t('start.readMore')}</Button>
    </article>
  );
};

export default Event;
