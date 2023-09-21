import { useTranslation } from 'react-i18next';

import useBreakpoint, { DESKTOP } from '../../hooks/useBreakpoint';

import styles from './Start.module.scss';
import Article from './Article/Article';
import Event from './Event/Event';
import { useContext, useEffect, useState } from 'react';
import fixUrl from '../../utils/fix-url';
import Spinner from '../../components/Spinner/Spinner';
import { UserContext } from '../../context/UserContext';

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
  const { locale } = useContext(UserContext);

  const { t } = useTranslation();

  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;

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
    void getNewsItems();
  }, [locale]);

  return (
    <div className={styles.startContainer}>
      {newsItems.length === 1 ? (
        <div className={styles.loading}>
          <p>{t('misc.loading')}</p>
          <Spinner isLarge />
        </div>
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
            <div className={styles.articlesContainer}>
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
                <h3>{t('start.upcoming')}</h3>
                <div className={styles.eventsGrid}>
                  <Event
                    title={'Händelse 1'}
                    description={'Beskrivning av händelse 1'}
                    linkTo={'länkTillHändelse1'}
                  />
                  <Event
                    title={'Händelse 2'}
                    description={'Beskrivning av händelse 2'}
                    linkTo={'länkTillHändelse2'}
                  />
                  <Event
                    title={'Händelse 3'}
                    description={'Beskrivning av händelse 3'}
                    linkTo={'länkTillHändelse3'}
                  />
                </div>
              </div>
            </div>
            {isDesktop && (
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
          </div>
          <div>
            <p>Carousel</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Start;
