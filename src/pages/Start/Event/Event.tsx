import { useTranslation } from 'react-i18next';

import formatDate, { FormatType } from '@utils/format-date';

import Button from '@components/Button/Button';

import styles from './Event.module.scss';

interface EventProps {
  date: string;
  title: string;
  linkTo: string;
}

const Event = ({ date, title, linkTo }: EventProps): JSX.Element => {
  const { t } = useTranslation();
  const formattedDateAndTime = formatDate(date, FormatType.DATE_AND_TIME);

  return (
    <article className={styles.eventContainer}>
      <h4 className={styles.heading}>{formattedDateAndTime}</h4>

      <p className={styles.paragraph}>{title}</p>
      <Button to={linkTo}>{t('start.readMore')}</Button>
    </article>
  );
};

export default Event;
