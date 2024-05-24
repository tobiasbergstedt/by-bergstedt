import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import { type NewsItem as NewsItemProps } from '@interfaces/interfaces';
import { fetchData } from '@utils/api';
import fixUrl from '@utils/fix-url';

import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import Loading from '@components/Spinner/Loading/Loading';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';

import styles from './NewsItem.module.scss';
import { useParams } from 'react-router-dom';
import { formatDateToLocaleString } from '@utils/format-date';

const NewsItem = (): JSX.Element => {
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newsItemData, setNewsItemData] = useState<NewsItemProps | null>(null);

  const { locale } = useContext(UserContext);
  const { uuid } = useParams<{ uuid: string }>();

  const { t } = useTranslation();

  useEffect(() => {
    void fetchData(
      [
        {
          url: `/api/news-items?populate=*&pagination[page]=1&pagination[pageSize]=1&sort[createdAt]=DESC&filters[$and][0][uuid][$eq]=${uuid}`,
          setData: setNewsItemData,
          errorMessage: t('misc.apiErrors.newsItem'),
          fetchSingleItem: true,
        },
      ],
      setIsLoading,
      setApiError,
    );
  }, []);

  return (
    <div className={styles.newsItemContainer}>
      <SEOHelmet
        title={t('helmet.news.title')}
        description={t('helmet.news.description')}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!apiError.includes(t('misc.apiErrors.newsItem')) &&
          newsItemData !== null ? (
            <>
              <h1 className={styles.newsItemHeader}>
                {locale === 'sv'
                  ? newsItemData.attributes.title
                  : newsItemData.attributes.localizations.data[0].attributes
                      .title}
              </h1>
              <p className={styles.datePublished}>
                {t('newsItem.firstPublished')}:{' '}
                {formatDateToLocaleString(newsItemData.attributes.publishedAt)}
              </p>
              <div className={styles.newsImageContainer}>
                <img
                  src={fixUrl(
                    newsItemData.attributes.image.data.attributes.formats
                      .large !== undefined
                      ? newsItemData.attributes.image.data.attributes.formats
                          .large.url
                      : newsItemData.attributes.image.data.attributes.url,
                  )}
                  alt={t('newsItem.alt', {
                    newsHeading:
                      locale === 'sv'
                        ? newsItemData.attributes.title
                        : newsItemData.attributes.localizations.data[0]
                            .attributes.title,
                  })}
                  className={styles.newsImage}
                />
              </div>
              <p className={styles.textContent}>
                {locale === 'sv'
                  ? newsItemData.attributes.text
                  : newsItemData.attributes.localizations.data[0].attributes
                      .text}
              </p>
            </>
          ) : (
            <ErrorMessage
              identifier={t('misc.apiErrors.errorHeading')}
              errorMessage={apiError}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NewsItem;
