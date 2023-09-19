import { useTranslation } from 'react-i18next';

import styles from './Start.module.scss';
import Button from '../../components/Button/Button';

// import { fixUrl } from '../../utils'

const Start = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.startContainer}>
      <article className={styles.mainArticle}>
        <section className={styles.mainContent}>
          <h1 className={styles.mainHeading}>
            Heading number one of this woodworking portfolio website
          </h1>
          <p>
            Paragraph to the first heading of this woodworking portfolio
            website.
          </p>
          <Button>Read more</Button>
          <Button isDisabled>Read more</Button>
          <Button isSecondary>Read more</Button>
          <Button isSecondary isDisabled>
            Read more
          </Button>
        </section>
        <div className={styles.mainImage}></div>
      </article>
      <div className={styles.def}></div>
    </div>
  );
};

export default Start;
