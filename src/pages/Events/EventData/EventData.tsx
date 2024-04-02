import { Link } from 'react-router-dom';

import styles from './EventData.module.scss';
import {
  formatDateToLocaleString,
  getMonthNameFromDate,
} from '@utils/format-date';
import clsx from 'clsx';

interface Props {
  title: string;
  description: string;
  location: string;
  date: string;
  linkTo: string;
  imageUrl: string;
}

const EventData = ({
  title,
  description,
  location,
  date,
  linkTo,
  imageUrl,
}: Props): JSX.Element => {
  const day = new Date(date).getDate().toString().padStart(2, '0');
  const month = getMonthNameFromDate(date).slice(0, 3);

  return (
    <div className={styles.singleEvent}>
      <div
        className={clsx(styles.dateAndCoverImage, {
          [styles.noImage]: imageUrl.length === 0,
        })}
      >
        <div className={styles.date}>
          <p className={styles.day}>{day}</p>
          <p className={styles.month}>{month}</p>
        </div>
        {imageUrl.length >= 1 && (
          <div className={styles.imageWrapper}>
            <img src={imageUrl} alt="" className={styles.eventImage} />
          </div>
        )}
      </div>
      <div className={styles.eventData}>
        <Link to={linkTo} target="_blank">
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <p className={styles.location}>
          {location} ({formatDateToLocaleString(date)})
        </p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default EventData;
