import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import useBreakpoint, { DESKTOP } from '@hooks/useBreakpoint';

import Button from '@components/Button/Button';

import styles from './Article.module.scss';

interface ArticleProps {
  title: string;
  description: string;
  linkTo: string;
  isMainArticle?: boolean;
  imageUrl?: string;
  imageAlt?: string;
}

const Article = ({
  title,
  description,
  linkTo,
  isMainArticle,
  imageUrl,
  imageAlt,
}: ArticleProps): JSX.Element => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;
  const { t } = useTranslation();

  return (
    <article className={styles.mainArticle}>
      <section
        className={clsx(styles.mainContent, {
          [styles.gridContent]: !(isMainArticle ?? false),
        })}
      >
        {imageUrl != null && (
          <div className={styles.mainImageWrapper}>
            <a href={linkTo}>
              <img src={imageUrl} alt={imageAlt} className={styles.mainImage} />
            </a>
          </div>
        )}
        {isMainArticle === true ? (
          <a href={linkTo}>
            <h1 className={styles.mainHeading}>{title}</h1>
          </a>
        ) : (
          <a href={linkTo}>
            <h2 className={clsx(styles.mainHeading, styles.smallerHeading)}>
              {title}
            </h2>
          </a>
        )}

        <p
          className={clsx(styles.mainParagraph, {
            [styles.smallParagraph]: !(isMainArticle ?? false),
          })}
        >
          {description}
        </p>
        <Button to={linkTo}>{t('start.readMore')}</Button>
      </section>
      {isDesktop && isMainArticle === true && (
        <div className={styles.instaWrapper}>
          <div
            style={{
              width: '500px',
              height: '500px',
              backgroundColor: 'red',
            }}
          ></div>
        </div>
      )}
    </article>
  );
};

export default Article;
