import fixUrl from '@utils/fix-url';

import { type AboutData, type Testimonial } from '@interfaces/interfaces';

import testimonialImage1 from '@assets/icons/testimonial-1.svg';
import testimonialImage2 from '@assets/icons/testimonial-2.svg';
import testimonialImage3 from '@assets/icons/testimonial-3.svg';

import styles from '../About.module.scss';

const Testimonials = ({
  aboutData,
}: {
  aboutData: AboutData | null;
}): JSX.Element => {
  const getTestimonialImage = (index: number): string | null => {
    switch (index) {
      case 1:
        return testimonialImage1;
      case 2:
        return testimonialImage2;
      case 3:
        return testimonialImage3;
      default:
        return testimonialImage1;
    }
  };

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
                    attributes.image.data.attributes.formats.thumbnail !==
                      undefined
                      ? attributes.image.data.attributes.formats.thumbnail.url
                      : attributes.image.data.attributes.url,
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
                  maskImage: `url(${getTestimonialImage(index + 1)})`,
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
