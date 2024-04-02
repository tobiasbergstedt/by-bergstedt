import { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { UserContext } from '@context/UserContext';
import { type Product, type GroupedItems } from '@interfaces/interfaces';
import fixUrl from '@utils/fix-url';
import formatPrice from '@utils/format-price';

import SoldOut from '@components/GalleryItems/SoldOut/Soldout';

import styles from './GalleryItems.module.scss';

interface GalleryProps {
  filteredItems: Product[];
  products: Product[];
  isShop?: boolean;
}

const GalleryItems = ({
  filteredItems,
  products,
  isShop,
}: GalleryProps): JSX.Element => {
  const [groupedItems, setGroupedItems] = useState<GroupedItems>({});
  const [shopItems, setShopItems] = useState<Product[]>([]);

  const { locale } = useContext(UserContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (isShop === true) {
      setShopItems(filteredItems);
    } else {
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
    }
  }, [filteredItems, products]);

  const renderProducts = (productList: Product[]): JSX.Element => {
    return (
      <div
        className={clsx(styles.galleryWrapper, {
          [styles.shopWrapper]: isShop,
        })}
      >
        {productList.map(({ attributes }, itemIndex) => (
          <Link to={`/product/${attributes.uuid}`} key={itemIndex}>
            <div className={styles.galleryItemContainer}>
              <div
                className={styles.imageWrapper}
                style={{
                  aspectRatio:
                    attributes.images.data[0].attributes.formats.small.width /
                    attributes.images.data[0].attributes.formats.small.height,
                }}
              >
                <img
                  className={clsx(styles.galleryImage, {
                    [styles.isSoldOut]: attributes.amount === 0,
                  })}
                  src={fixUrl(
                    attributes.images.data[0].attributes.formats.small.url,
                  )}
                  alt={
                    locale === t('locales.sv')
                      ? `${t('gallery.coverImage')} ${attributes.title}`
                      : `${t('gallery.coverImage')} ${
                          attributes.localizations.data[0].attributes.title
                        }`
                  }
                />
              </div>
              <div className={styles.itemDescription}>
                <h3 className={styles.itemHeading}>
                  {locale === t('locales.sv')
                    ? attributes.title
                    : attributes.localizations.data[0].attributes.title}
                </h3>
                <p
                  className={clsx(styles.itemPrice, {
                    [styles.priceSoldOut]: attributes.amount === 0,
                  })}
                >
                  {formatPrice(attributes.price)} {t('misc.currencies.sek')}
                </p>
              </div>
              {attributes.amount === 0 && <SoldOut />}
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      {isShop === true
        ? renderProducts(shopItems)
        : Object.entries(groupedItems)
            .reverse() // Reverse the array of key-value pairs
            .map(([year, yearItems]) => (
              <Fragment key={year}>
                <h2 className={styles.yearHeading}>{year}</h2>
                {renderProducts(yearItems)}
              </Fragment>
            ))}
    </>
  );
};

export default GalleryItems;
