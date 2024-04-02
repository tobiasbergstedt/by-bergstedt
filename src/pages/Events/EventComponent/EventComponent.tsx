import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type MetaData, type EventItem } from '@interfaces/interfaces';
import { fetchData } from '@utils/api';
import fixUrl from '@utils/fix-url';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import Pagination from '@components/Pagination/Pagination';
import { UserContext } from '@context/UserContext';
import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import Loading from '@components/Spinner/Loading/Loading';
import PaginationInfo from '@components/Pagination/PaginationInfo/PaginationInfo';
import EventData from '../EventData/EventData';
import styles from '../Events.module.scss';
import Button from '@components/Button/Button';

// Prop Types could be more detailed based on your needs
interface EventComponentProps {
  eventType: 'upcoming' | 'past';
}

const EventComponent = ({ eventType }: EventComponentProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string>('');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [paginationIndex, setPaginationIndex] = useState<number>(1);

  const { locale } = useContext(UserContext);
  const { t } = useTranslation();

  useEffect(() => {
    const timestamp = generateTimestamp();
    const isUpcoming = eventType === 'upcoming';

    const sortDirection = isUpcoming ? 'ASC' : 'DESC';
    const filterOperator = isUpcoming ? '$gte' : '$lte';
    const filter = `&filters[date][${filterOperator}]=${timestamp}`;
    const url = `/api/events?populate=*&pagination[page]=${paginationIndex}&pagination[pageSize]=10&sort[date]=${sortDirection}&locale=${locale}${filter}`;

    void fetchData(
      [
        {
          url,
          setData: setEvents,
          errorMessage: t('misc.apiErrors.events'),
          setMetaData,
        },
      ],
      setIsLoading,
      setApiError,
    );
  }, [locale, paginationIndex, eventType]);

  const generateTimestamp = (): string => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const timestamp = `${formattedDate}T00:00:00.000Z`;
    return timestamp;
  };

  const buttonTo = eventType === 'upcoming' ? 'past' : '/events';
  const buttonLabel =
    eventType === 'upcoming' ? t('events.past') : t('events.coming');
  const headerLabel =
    eventType === 'upcoming' ? t('events.heading') : t('events.pastHeading');
  const noEventsMessage =
    eventType === 'upcoming'
      ? t('events.noEventsPlanned')
      : t('events.noPastEvents');

  return (
    <>
      <SEOHelmet
        title={t('helmet.news.title')}
        description={t('helmet.news.description')}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.eventsContainer}>
          <Button to={buttonTo} className={styles.pastEventsButton} isText>
            {buttonLabel}
          </Button>
          <h1 className={styles.upcomingHeader}>{headerLabel}</h1>
          {!apiError.includes(t('misc.apiErrors.newsItems')) &&
          events !== null ? (
            <>
              <PaginationInfo metaData={metaData} />
              <div className={styles.events}>
                {events.length >= 1 ? (
                  events.map(({ attributes }, index) => (
                    <EventData
                      key={index}
                      title={attributes.title}
                      location={attributes.location}
                      description={attributes.description}
                      linkTo={attributes.linkTo}
                      date={attributes.date}
                      imageUrl={
                        attributes.image.data !== null
                          ? fixUrl(attributes.image.data.attributes.url)
                          : ''
                      }
                    />
                  ))
                ) : (
                  <p className={styles.noEvents}>{noEventsMessage}</p>
                )}
              </div>
              <Pagination
                pagination={metaData?.pagination}
                onPageChange={setPaginationIndex}
              />
            </>
          ) : (
            <ErrorMessage
              identifier={t('misc.apiErrors.errorHeading')}
              errorMessage={apiError}
            />
          )}
        </div>
      )}
    </>
  );
};

export default EventComponent;
