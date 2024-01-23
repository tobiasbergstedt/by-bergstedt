import fixUrl from '@utils/fix-url';

import styles from '../About.module.scss';
import { type AboutData, type Testimonial } from '@interfaces/interfaces';

const Testimonials = ({
  aboutData,
}: {
  aboutData: AboutData | null;
}): JSX.Element => {
  return (
    <div className={styles.testimonialsContainer}>
      {aboutData?.attributes.testimonials.data.map(
        ({ attributes }: Testimonial, index: number) => (
          <div className={styles.testimonial} key={index}>
            <p className={styles.testimonialTop}>
              <span className={styles.quoteStart}>&#10077;</span>
              {attributes.testimonial}
              <span className={styles.quoteEnd}>&#10078;</span>
            </p>
            <div className={styles.testimonialBottom}>
              <div className={styles.testimonialImageWrapper}>
                <img
                  src={fixUrl(
                    attributes.image.data.attributes.formats.thumbnail.url,
                  )}
                  alt={`Profile image of ${attributes.name}`}
                  className={styles.testimonialImage}
                />
              </div>
              <p className={styles.testimonialName}>{attributes.name}</p>
              <p className={styles.testimonialRole}>{attributes.description}</p>
              <div
                className={styles.decoration}
                style={{
                  maskImage: `url(/src/assets/icons/testimonial-${
                    index + 1
                  }.svg)`,
                }}
              />
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default Testimonials;
