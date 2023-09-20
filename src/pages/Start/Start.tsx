import { useTranslation } from 'react-i18next';

import useBreakpoint, { DESKTOP } from '../../hooks/useBreakpoint';

import styles from './Start.module.scss';
import Article from './Article/Article';
import Event from './Event/Event';

// import { fixUrl } from '../../utils'

const Start = (): JSX.Element => {
  const { t } = useTranslation();

  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;

  return (
    <div className={styles.startContainer}>
      <Article
        isMainArticle
        title={'Heading number one of this woodworking portfolio website'}
        description={
          'Paragraph to the first heading of this woodworking portfolio website.'
        }
        linkTo={'https://google.se'}
        imageUrl={
          'https://cdn11.bigcommerce.com/s-2l4d71by9e/images/stencil/1280w/products/125/3260/bc-product-image-R2__12152.1660845068.jpg'
        }
      />
      <div className={styles.contentContainer}>
        <div className={styles.articlesContainer}>
          <div className={styles.articlesGrid}>
            <Article
              title={'Heading number two of this woodworking portfolio website'}
              description={
                'Paragraph to the second heading of this woodworking portfolio website.'
              }
              linkTo={'https://facebook.com'}
            />
            <Article
              title={
                'Heading number three of this woodworking portfolio website'
              }
              description={
                'Paragraph to the third heading of this woodworking portfolio website.'
              }
              linkTo={'https://aftonbladet.se'}
            />
            <Article
              title={
                'Heading number four of this woodworking portfolio website'
              }
              description={
                'Paragraph to the fourth heading of this woodworking portfolio website.'
              }
              linkTo={'https://svenskkniv.se'}
            />
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
            <h3>Kommande händelser</h3>
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
    </div>
  );
};

export default Start;
