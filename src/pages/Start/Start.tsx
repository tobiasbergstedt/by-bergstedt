import { useTranslation } from 'react-i18next';

import styles from './Start.module.scss';
import Article from './Article/Article';

// import { fixUrl } from '../../utils'

const Start = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.startContainer}>
      <Article
        title={'Heading number one of this woodworking portfolio website'}
        description={
          'Paragraph to the first heading of this woodworking portfolio website.'
        }
        linkTo={'https://google.se'}
      />
      <div className={styles.articlesGrid}>
        <Article
          title={'Heading number two of this woodworking portfolio website'}
          description={
            'Paragraph to the second heading of this woodworking portfolio website.'
          }
          linkTo={'https://facebook.com'}
        />
        <Article
          title={'Heading number three of this woodworking portfolio website'}
          description={
            'Paragraph to the third heading of this woodworking portfolio website.'
          }
          linkTo={'https://aftonbladet.se'}
        />
        <Article
          title={'Heading number four of this woodworking portfolio website'}
          description={
            'Paragraph to the fourth heading of this woodworking portfolio website.'
          }
          linkTo={'https://svenskkniv.se'}
        />
      </div>
    </div>
  );
};

export default Start;
