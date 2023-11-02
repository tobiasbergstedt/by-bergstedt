import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

import DotNavigation from './Dots/DotNavigation';

import styles from './Carousel.module.scss';

interface Slide {
  image: string;
  linkTo: string;
  alt: string;
}

interface ImageCarouselProps {
  slides: Slide[];
}

export const ImageCarousel = ({ slides }: ImageCarouselProps): JSX.Element => {
  // const { slides } = slides;
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
        {slides.map(({ image, alt, linkTo }, index) => (
          <div className={styles.emblaSlide} key={index}>
            <a href={linkTo} target="blank">
              <img src={image} alt={alt} />
            </a>
          </div>
        ))}
      </div>
      <div className={styles.navigation}>
        <div className={styles.dots}>
          {slides.map((_, index) => (
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
    </div>
  );
};

export default ImageCarousel;
