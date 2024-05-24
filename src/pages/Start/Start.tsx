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
import {
  type NewsItemLocalization,
  type InstaPost,
  type EventItem,
} from '@interfaces/interfaces';

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
  id: number;
  attributes: {
    createdAt: string;
    publishedAt: string;
    title: string;
    description: string;
    image: Image;
    text: string;
    uuid: string;
    localizations: {
      data: NewsItemLocalization[];
    };
  };
}

const Start = (): JSX.Element => {
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newsItems, setNewsItems] = useState<NewsItem[] | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [instaFeed, setInstaFeed] = useState<InstaPost[] | undefined>();
  const { locale } = useContext(UserContext);

  const instaToken = import.meta.env.VITE_INSTA_TOKEN;

  const { t } = useTranslation();

  const generateTimestamp = (): string => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const timestamp = `${formattedDate}T00:00:00.000Z`;

    return timestamp;
  };

  useEffect(() => {
    void fetchData(
      [
        {
          url: `/api/news-items?populate=*&pagination[page]=1&pagination[pageSize]=4&sort[createdAt]=DESC&locale=${locale}`,
          setData: setNewsItems,
          errorMessage: t('misc.apiErrors.newsItems'),
        },
        {
          url: `/api/events?populate=*&pagination[page]=1&pagination[pageSize]=3&sort[date]=ASC&locale=${locale}&filters[$and][0][date][$gte]=${generateTimestamp()}`,
          setData: setEvents,
          errorMessage: t('misc.apiErrors.events'),
        },
        {
          url: `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${instaToken}`,
          setData: setInstaFeed,
          errorMessage: t('misc.apiErrors.instaFeed'),
          isExternalApiCall: true,
        },
      ],
      setIsLoading,
      setApiError,
    );
  }, [locale]);

  useEffect(() => {
    const fetchPromises = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${instaToken}`,
        );

        if (!response.ok) {
          // Throw an error if response status is not ok
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Wait for all Promises to resolve
    void fetchPromises();
  }, []);

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
            linkTo={
              newsItems !== null
                ? `/news/${
                    locale === 'sv'
                      ? newsItems[0].attributes.uuid
                      : newsItems[0].attributes.localizations.data[0].attributes
                          .uuid
                  }`
                : ''
            }
            imageUrl={fixUrl(
              newsItems !== null
                ? newsItems[0].attributes.image.data.attributes.formats
                    .medium !== undefined
                  ? newsItems[0].attributes.image.data.attributes.formats.medium
                      .url
                  : newsItems[0].attributes.image.data.attributes.url
                : '',
            )}
            apiError={apiError}
            publishedAt={
              newsItems !== null ? newsItems[0].attributes.publishedAt : ''
            }
          />
          <div className={styles.contentContainer}>
            <div className={styles.eventsContainer}>
              <h3 className={styles.upcomingHeader}>
                {t('start.upcoming')}
                {' ('}
                <Link to={'/events'} className={styles.moreEvents}>
                  {t('start.moreEvents')}
                </Link>
                {')'}
              </h3>
              {!apiError.includes(t('misc.apiErrors.events')) ? (
                <div className={styles.eventsGrid}>
                  {events.map(({ attributes }, index) => (
                    <Event
                      key={index}
                      date={attributes.date}
                      title={attributes.title}
                      linkTo={attributes.linkTo}
                      imageUrl={
                        attributes.image.data != null
                          ? attributes.image.data.attributes.formats
                              .thumbnail !== undefined
                            ? attributes.image.data.attributes.formats.thumbnail
                                .url
                            : attributes.image.data.attributes.url
                          : ''
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.noEvents}>
                  <p>{t('start.noEvents1')}</p>
                  <p>{t('start.noEvents2')}</p>
                </div>
              )}
            </div>
            <div className={styles.carouselWrapper}>
              <ImageCarousel slides={instaFeed} />
            </div>
            <div className={styles.articlesContainer}>
              <h3 className={styles.upcomingHeader}>
                {t('start.otherNews')}
                {' ('}
                <Link to={'/news'} className={styles.moreEvents}>
                  {t('start.moreEvents')}
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
                        linkTo={`/news/${
                          locale === 'sv'
                            ? attributes.uuid
                            : attributes.localizations.data[0].attributes.uuid
                        }`}
                        apiError={apiError}
                        isMainArticle={false}
                        imageUrl={fixUrl(
                          newsItems !== null
                            ? newsItems[index + 1].attributes.image.data
                                .attributes.formats.medium.url
                            : '',
                        )}
                        publishedAt={attributes.publishedAt}
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
