import { useTranslation } from 'react-i18next';

import Button from '../../../components/Button/Button';

import styles from './Article.module.scss';

interface ArticleProps {
  title: string;
  description: string;
  linkTo: string;
}

const Article = ({ title, description, linkTo }: ArticleProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <article className={styles.mainArticle}>
      <section className={styles.mainContent}>
        <h1 className={styles.mainHeading}>{title}</h1>
        <p className={styles.mainParagraph}>{description}</p>
        <Button to={linkTo}>{t('start.readMore')}</Button>
      </section>
      <div className={styles.mainImageWrapper}>
        <img className={styles.mainImage}></img>
      </div>
    </article>
  );
};

export default Article;
