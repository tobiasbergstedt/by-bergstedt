/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

import { type InstaPost } from '@interfaces/interfaces';

import DotNavigation from './Dots/DotNavigation';

import { ReactComponent as IgIcon } from '@assets/icons/ig.svg';

import styles from './Carousel.module.scss';
import { Link } from 'react-router-dom';

interface ImageCarouselProps {
  slides: InstaPost[] | undefined;
}

export const ImageCarousel = ({ slides }: ImageCarouselProps): JSX.Element => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { dragFree: true, containScroll: 'trimSnaps', loop: true },
    [AutoPlay()],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi != null) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const goToSlide = (index: number): void => {
    if (emblaApi != null) {
      emblaApi.scrollTo(index);
    }
  };

  return (
    <div className={styles.emblaWrapper} ref={emblaRef}>
      <div className={styles.emblaContainer}>
        {slides
          ?.slice(0, 10)
          .map(({ media_url, caption, permalink }, index) => (
            <a
              href={permalink}
              target="blank"
              className={styles.emblaSlide}
              key={index}
            >
              <img src={media_url} alt={caption} />
            </a>
          ))}
      </div>
      <div className={styles.navigation}>
        <div className={styles.dots}>
          {slides?.slice(0, 10).map((_, index) => (
            <DotNavigation
              key={index}
              onClick={() => {
                goToSlide(index);
              }}
              active={index === selectedIndex}
            />
          ))}
        </div>
      </div>
      {/* <span className={styles.instaHeading}> */}
      <Link to={'https://instagram.com/bybergstedt'} target="_blank">
        <IgIcon className={styles.instaHeading} />
      </Link>
      {/* </span> */}
    </div>
  );
};

export default ImageCarousel;
