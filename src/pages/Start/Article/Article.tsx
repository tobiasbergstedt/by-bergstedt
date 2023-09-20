import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Button from '../../../components/Button/Button';

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
  const { t } = useTranslation();

  return (
    <article className={styles.mainArticle}>
      <section
        className={clsx(styles.mainContent, {
          [styles.gridContent]: !(isMainArticle ?? false),
        })}
      >
        {isMainArticle === true ? (
          <h1 className={styles.mainHeading}>{title}</h1>
        ) : (
          <h2 className={clsx(styles.mainHeading, styles.smallerHeading)}>
            {title}
          </h2>
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
      {imageUrl != null && (
        <div className={styles.mainImageWrapper}>
          <img src={imageUrl} alt={imageAlt} className={styles.mainImage} />
        </div>
      )}
    </article>
  );
};

export default Article;
