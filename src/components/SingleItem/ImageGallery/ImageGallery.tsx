import { useEffect, useState } from 'react';

import fixUrl from '@utils/fix-url';
import {
  type ZoomPosition,
  type ProductPropsImageGallery,
} from '@interfaces/interfaces';

import styles from './ImageGallery.module.scss';
import SoldOut from '@components/GalleryItems/SoldOut/Soldout';
import Thumbnail from '@components/SingleItem/Thumbnail/Thumbnail';

const ImageGallery = ({ product }: ProductPropsImageGallery): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [zoomPosition, setZoomPosition] = useState<ZoomPosition>({
    x: 0,
    y: 0,
  });

  const handleThumbnailClick = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Calculate the zoom position relative to the large image
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / container.offsetWidth;
    const y = (e.clientY - rect.top) / container.offsetHeight;

    setZoomPosition((prevZoomPosition) => ({
      x: prevZoomPosition.x + (x - prevZoomPosition.x) * 0.3, // Adjust the smoothing factor as needed
      y: prevZoomPosition.y + (y - prevZoomPosition.y) * 0.3,
    }));
  };

  useEffect(() => {
    setSelectedImage(
      product.attributes.images.data[0].attributes.formats.large.url,
    );
  }, []);

  return (
    <>
      {product.attributes != null && (
        <div className={styles.imageContainer}>
          <div
            className={styles.mainImageWrapper}
            onMouseMove={handleMouseMove}
          >
            <img
              className={styles.mainImage}
              src={fixUrl(
                selectedImage.length !== 0
                  ? selectedImage
                  : product.attributes.images.data[0].attributes.formats.large
                      .url,
              )}
              style={{
                transformOrigin: `${zoomPosition.x * 100}% ${
                  zoomPosition.y * 100
                }%`,
              }}
              alt={product.attributes.title}
            />
            {product.attributes.amount === 0 && <SoldOut />}
          </div>
          <div
            className={styles.thumbnailsContainer}
            style={
              product.attributes.images.data.length <= 4
                ? { gridTemplateColumns: 'repeat(4, 1fr)' }
                : {
                    gridTemplateColumns: `repeat(${product.attributes.images.data.length}, 1fr)`,
                  }
            }
          >
            {product.attributes.images.data.map((image, index) => (
              <Thumbnail
                key={index}
                imageUrl={image.attributes.formats.small.url}
                isSelected={
                  image.attributes.formats.large.url === selectedImage
                }
                onThumbnailClick={() => {
                  handleThumbnailClick(image.attributes.formats.large.url);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
