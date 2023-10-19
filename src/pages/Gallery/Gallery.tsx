import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import { fetchData } from '@utils/api';
import {
  type Product,
  type Category,
  type Filter,
} from '@interfaces/interfaces';

import ProductsFilter from '@components/GalleryItems/ProductsFilter/ProductsFilter';

import styles from './Gallery.module.scss';
import GalleryItems from '@components/GalleryItems/GalleryItems';

const MyGallery = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>({
    category: null,
    rangeValues: [0, 10000],
  });

  const { locale } = useContext(UserContext);
  const { t } = useTranslation();

  useEffect(() => {
    void fetchData(
      `/api/items?populate=*&sort[createdAt]=DESC&locale=${locale}`,
      setProducts,
    );

    void fetchData(
      `/api/categories?sort=name:ASC&locale=${locale}`,
      setCategories,
    );
  }, [locale]);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const price = product.attributes.price;
      const categoryMatch =
        filter.category === null ||
        filter.category === t('misc.all') ||
        product.attributes.categories.data.some(
          (category) => category.attributes.slug === filter.category,
        );
      return (
        price >= filter.rangeValues[0] &&
        price <= filter.rangeValues[1] &&
        categoryMatch
      );
    });
    setFilteredItems(filteredProducts);
  }, [filter]);

  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.heading}>{t('gallery.heading')}</h1>
      <ProductsFilter
        categories={categories}
        filter={filter}
        setFilter={setFilter}
        products={products}
      />
      {filteredItems.length > 0 ? (
        <GalleryItems filteredItems={filteredItems} products={products} />
      ) : (
        <div className={styles.noResults}>
          <p>{t('gallery.noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default MyGallery;
