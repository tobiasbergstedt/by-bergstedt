import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useBreakpoint, { DESKTOP } from '@hooks/useBreakpoint';
import { fixUrl } from '@utils';

import Article from './Article/Article';
import Event from './Event/Event';
import { UserContext } from '@context/UserContext';
import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import ImageCarousel from '@components/Carousel/Carousel';

import styles from './Start.module.scss';
import Loading from '@components/Spinner/Loading/Loading';

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
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      attributes: {
        title: '',
        description: '',
        linkTo: '',
        image: {
          data: {
            id: 0,
            attributes: {
              formats: {
                medium: {
                  url: '',
                },
              },
              url: '',
            },
          },
        },
      },
    },
  ]);
  const [events, setEvents] = useState<EventItem[]>([
    {
      attributes: {
        date: '',
        title: '',
        linkTo: '',
      },
    },
  ]);
  const { locale } = useContext(UserContext);

  const { t } = useTranslation();

  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;

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
    const getNewsItems = async (): Promise<void> => {
      const response = await fetch(
        fixUrl(
          `/api/news-items?populate=*&pagination[page]=1&pagination[pageSize]=4&sort[createdAt]=DESC&locale=${locale}`,
        ),
      );
      const apiData = await response.json();
      setNewsItems(apiData.data);
    };
    const getEvents = async (): Promise<void> => {
      const response = await fetch(
        fixUrl(
          `/api/events?populate=*&pagination[page]=1&pagination[pageSize]=3&sort[date]=ASC&locale=${locale}`,
        ),
      );
      const apiData = await response.json();
      setEvents(apiData.data);
    };
    void getNewsItems();
    void getEvents();
  }, [locale]);

  return (
    <div className={styles.startContainer}>
      <SEOHelmet
        title={t('helmet.start.title')}
        description={t('helmet.start.description')}
      />
      {newsItems.length === 1 ? (
        <Loading />
      ) : (
        <>
          <Article
            isMainArticle
            title={newsItems[0].attributes.title}
            description={newsItems[0].attributes.description}
            linkTo={newsItems[0].attributes.linkTo}
            imageUrl={fixUrl(
              newsItems[0].attributes.image.data.attributes.formats.medium.url,
            )}
          />
          <div className={styles.contentContainer}>
            {!isDesktop && (
              <div className={styles.instaWrapper}>
                <div
                  style={{
                    width: '250px',
                    height: '250px',
                    backgroundColor: 'red',
                  }}
                ></div>
              </div>
            )}
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
            <div>
              <ImageCarousel slides={slides} />
            </div>
            <div className={styles.articlesGrid}>
              {newsItems.slice(1, 4).map(({ attributes }, index) => (
                <Article
                  key={index}
                  title={attributes.title}
                  description={attributes.description}
                  linkTo={attributes.linkTo}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Start;
