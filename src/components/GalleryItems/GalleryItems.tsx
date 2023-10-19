import { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';

import { type Product, type GroupedItems } from '@interfaces/interfaces';
import { fixUrl } from '@utils';

import styles from './GalleryItems.module.scss';

interface GalleryProps {
  filteredItems: Product[];
  products: Product[];
}

const GalleryItems = ({
  filteredItems,
  products,
}: GalleryProps): JSX.Element => {
  const [groupedItems, setGroupedItems] = useState<GroupedItems>({});

  useEffect(() => {
    const newGroupedItems: Record<number, Product[]> = {};
    const itemsToGroup = filteredItems.length > 0 ? filteredItems : products;

    itemsToGroup.forEach((item) => {
      const year = new Date(item.attributes.createdAt).getFullYear();
      if (newGroupedItems[year] == null) {
        newGroupedItems[year] = [];
      }
      newGroupedItems[year].push(item);
    });

    setGroupedItems(newGroupedItems);
  }, [filteredItems, products]);

  return (
    <>
      {Object.entries(groupedItems).map(([year, yearItems]) => {
        const chunkedYearItems = [];

        // Split yearItems into subarrays of 11 items each
        for (let i = 0; i < yearItems.length; i += 11) {
          chunkedYearItems.push(yearItems.slice(i, i + 11));
        }

        return (
          <Fragment key={year}>
            <h2 className={styles.yearHeading}>{year}</h2>
            <div className={styles.galleryWrapper}>
              {chunkedYearItems.map((chunk, chunkIndex) => (
                <div
                  key={chunkIndex}
                  className={clsx(styles.gallery, {
                    [styles.gallerySimple]: chunk.length <= 4,
                  })}
                >
                  {chunk.map((item, itemIndex) => (
                    <img
                      key={itemIndex}
                      className={styles.galleryImage}
                      src={fixUrl(
                        item.attributes.images.data[0].attributes.formats.small
                          .url,
                      )}
                      alt={item.attributes.title}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default GalleryItems;
