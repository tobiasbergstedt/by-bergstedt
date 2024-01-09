import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// import useBreakpoint, { DESKTOP } from '@hooks/useBreakpoint';
import { fetchData } from '@utils/api';

import Article from './Article/Article';
import Event from './Event/Event';
import { UserContext } from '@context/UserContext';
import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import ImageCarousel from '@components/Carousel/Carousel';
import Loading from '@components/Spinner/Loading/Loading';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';

import styles from './Start.module.scss';
import fixUrl from '@utils/fix-url';

interface Image {
  data: {
    id: number;
    attributes: {
      formats: {
        medium: {
          url: string;
        };
      };
      url: string;
    };
  };
}

interface NewsItem {
  attributes: {
    title: string;
    description: string;
    linkTo: string;
    image: Image;
  };
}

interface EventItem {
  attributes: {
    date: string;
    title: string;
    linkTo: string;
  };
}

const Start = (): JSX.Element => {
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newsItems, setNewsItems] = useState<NewsItem[] | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const { locale } = useContext(UserContext);

  const { t } = useTranslation();

  // const breakpoint = useBreakpoint();
  // const isDesktop = breakpoint === DESKTOP;

  const slides = [
    {
      image:
        'https://static.demilked.com/wp-content/uploads/2023/03/cool-woodworking-projects-9.jpeg',
      linkTo: 'https://google.se',
      alt: 'Alt 1',
    },
    {
      image:
        'https://i.pinimg.com/736x/20/e4/cd/20e4cd22c8abf76905ef76c0b2b4b40a.jpg',
      linkTo: 'https://google.se',
      alt: 'Alt 2',
    },
    {
      image:
        'https://www.boredpanda.com/blog/wp-content/uploads/2022/06/62b99899c4904_5wspvk7gun091__700.jpg',
      linkTo: 'https://google.se',
      alt: 'Alt 3',
    },
    {
      image:
        'https://121clicks.com/wp-content/uploads/2022/04/impressive-diy-woodworking-projects-10.jpg',
      linkTo: 'https://google.se',
      alt: 'Alt 4',
    },
  ];

  useEffect(() => {
    void fetchData(
      [
        {
          url: `/api/news-items?populate=*&pagination[page]=1&pagination[pageSize]=4&sort[createdAt]=DESC&locale=${locale}`,
          setData: setNewsItems,
          errorMessage: t('misc.apiErrors.newsItems'),
        },
        {
          url: `/api/events?populate=*&pagination[page]=1&pagination[pageSize]=3&sort[date]=ASC&locale=${locale}`,
          setData: setEvents,
          errorMessage: t('misc.apiErrors.events'),
        },
      ],
      setIsLoading,
      setApiError,
    );
  }, [locale]);

  return (
    <div className={styles.startContainer}>
      <SEOHelmet
        title={t('helmet.start.title')}
        description={t('helmet.start.description')}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Article
            isMainArticle
            title={newsItems !== null ? newsItems[0].attributes.title : ''}
            description={
              newsItems !== null ? newsItems[0].attributes.description : ''
            }
            linkTo={newsItems !== null ? newsItems[0].attributes.linkTo : ''}
            imageUrl={fixUrl(
              newsItems !== null
                ? newsItems[0].attributes.image.data.attributes.formats.medium
                    .url
                : '',
            )}
            apiError={apiError}
          />
          <div className={styles.contentContainer}>
            {!apiError.includes(t('misc.apiErrors.events')) && (
              <div className={styles.eventsContainer}>
                <h3 className={styles.upcomingHeader}>
                  {t('start.upcoming')}
                  {' ('}
                  <Link to={'/gallery'} className={styles.moreEvents}>
                    {t('start.moreEvents')}...
                  </Link>
                  {')'}
                </h3>
                <div className={styles.eventsGrid}>
                  {events.map(({ attributes }, index) => (
                    <Event
                      key={index}
                      date={attributes.date}
                      title={attributes.title}
                      linkTo={attributes.linkTo}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className={styles.carouselWrapper}>
              <ImageCarousel slides={slides} />
            </div>
            <div className={styles.articlesContainer}>
              <h3 className={styles.upcomingHeader}>
                {t('start.otherNews')}
                {' ('}
                <Link to={'/gallery'} className={styles.moreEvents}>
                  {t('start.moreEvents')}...
                </Link>
                {')'}
              </h3>
              {!apiError.includes(t('misc.apiErrors.newsItems')) ? (
                <div className={styles.articlesGrid}>
                  {newsItems
                    ?.slice(1, 4)
                    .map(({ attributes }, index) => (
                      <Article
                        key={index}
                        title={attributes.title}
                        description={attributes.description}
                        linkTo={attributes.linkTo}
                        apiError={apiError}
                        isMainArticle={false}
                        imageUrl={fixUrl(
                          newsItems !== null
                            ? newsItems[index + 1].attributes.image.data
                                .attributes.formats.medium.url
                            : '',
                        )}
                      />
                    ))}
                </div>
              ) : (
                <ErrorMessage
                  identifier={t('misc.apiErrors.errorHeading')}
                  errorMessage={apiError}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Start;
