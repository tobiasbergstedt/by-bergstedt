import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Button from '@components/Button/Button';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';

import styles from './Article.module.scss';
import { formatDateToLocaleString } from '@utils/format-date';
import { Link } from 'react-router-dom';

interface ArticleProps {
  title: string;
  description: string;
  linkTo: string;
  isMainArticle?: boolean;
  apiError: string;
  imageUrl?: string;
  imageAlt?: string;
  publishedAt: string;
}

const Article = ({
  title,
  description,
  linkTo,
  isMainArticle,
  imageUrl,
  imageAlt,
  apiError,
  publishedAt,
}: ArticleProps): JSX.Element => {
  const { t } = useTranslation();

  // const dateString = new Date(publishedAt);
  // const formattedDate = !isNaN(dateString.getTime())
  //   ? dateString.toLocaleString().replace('T', ' ')
  //   : new Date(new Date().getFullYear(), 0, 1)
  //       .toLocaleString()
  //       .replace('T', ' ');

  return (
    <div className={styles.articleContainer}>
      <article
        className={clsx(styles.mainArticle, {
          [styles.isMainArticle]: isMainArticle,
        })}
      >
        {!apiError.includes(t('misc.apiErrors.newsItems')) ? (
          <>
            <section
              className={clsx(styles.mainContent, {
                [styles.gridContent]: !(isMainArticle ?? false),
              })}
            >
              <Link to={linkTo}>
                {isMainArticle === true ? (
                  <h1 className={styles.mainHeading}>{title}</h1>
                ) : (
                  <h2
                    className={clsx(styles.mainHeading, styles.smallerHeading)}
                  >
                    {title}
                  </h2>
                )}
              </Link>

              <p
                className={clsx(
                  styles.mainParagraph,
                  styles.datePublished,
                  styles.smallParagraph,
                )}
              >
                {formatDateToLocaleString(publishedAt)}
              </p>
              <p
                className={clsx(styles.mainParagraph, {
                  [styles.smallParagraph]: !(isMainArticle ?? false),
                })}
              >
                {description}
              </p>
              {isMainArticle === true && (
                <Button to={linkTo}>{t('start.readMore')}</Button>
              )}
            </section>
            <section
              className={clsx(styles.imageSection, {
                [styles.isMainArticle]: isMainArticle,
              })}
            >
              {imageUrl != null && (
                <Link
                  to={linkTo}
                  className={clsx(styles.mainImageWrapper, {
                    [styles.mainArticleImageWrapper]: isMainArticle,
                  })}
                >
                  <img src={imageUrl} alt={imageAlt} />
                </Link>
              )}
            </section>
          </>
        ) : (
          <ErrorMessage
            identifier={t('misc.apiErrors.errorHeading')}
            errorMessage={apiError}
          />
        )}
      </article>
      {isMainArticle === false && (
        <Button to={linkTo}>{t('start.readMore')}</Button>
      )}
    </div>
  );
};

export default Article;
