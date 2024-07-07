import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import { type NewsItem, type MetaData } from '@interfaces/interfaces';
import { fetchData } from '@utils/api';

import Article from '@pages/Start/Article/Article';
import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import Loading from '@components/Spinner/Loading/Loading';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import Pagination from '@components/Pagination/Pagination';
import PaginationInfo from '@components/Pagination/PaginationInfo/PaginationInfo';

import styles from './News.module.scss';

const News = (): JSX.Element => {
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newsItems, setNewsItems] = useState<NewsItem[] | null>(null);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [paginationIndex, setPaginationIndex] = useState<number>(1);

  const { locale } = useContext(UserContext);

  const { t } = useTranslation();

  useEffect(() => {
    void fetchData(
      [
        {
          url: `/api/news-items?populate=*&pagination[page]=${paginationIndex}&pagination[pageSize]=12&sort[createdAt]=DESC&locale=${locale}`,
          setData: setNewsItems,
          errorMessage: t('misc.apiErrors.newsItems'),
          setMetaData,
        },
      ],
      setIsLoading,
      setApiError,
    );
  }, [locale, paginationIndex]);

  return (
    <>
      <SEOHelmet
        title={t('helmet.news.title')}
        description={t('helmet.news.description')}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.newsContainer}>
          <h3 className={styles.upcomingHeader}>{t('news.heading')}</h3>
          {!apiError.includes(t('misc.apiErrors.newsItems')) ? (
            <>
              <PaginationInfo metaData={metaData} />
              <div className={styles.newsGrid}>
                {newsItems?.map(({ attributes }, index) => (
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
                    imageUrl={
                      newsItems !== null
                        ? newsItems[index].attributes.image.data.attributes
                            .formats.medium.url
                        : ''
                    }
                    publishedAt={attributes.publishedAt}
                  />
                ))}
              </div>
              <Pagination
                pagination={metaData?.pagination}
                onPageChange={(newPage) => {
                  setPaginationIndex(newPage);
                }}
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

export default News;
