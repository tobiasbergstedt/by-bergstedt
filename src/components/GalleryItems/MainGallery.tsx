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
import GalleryItems from '@components/GalleryItems/GalleryItems';

import styles from './MainGallery.module.scss';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import Loading from '@components/Spinner/Loading/Loading';

interface Props {
  isShop: boolean;
  heading: string;
  passedStyles: any;
}

const MainGallery = ({ isShop, heading, passedStyles }: Props): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>({
    category: null,
    rangeValues: [0, 10000],
  });
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { locale } = useContext(UserContext);
  const { t } = useTranslation();

  useEffect(() => {
    void fetchData(
      [
        {
          url: `/api/items?populate=*&sort[createdAt]=DESC${
            isShop ? '&filters[$and][0][amount][$gte]=1' : ''
          }`,
          setData: setProducts,
          errorMessage: t('misc.apiErrors.products'),
        },
        {
          url: `/api/categories?sort=name:ASC&locale=${locale}`,
          setData: setCategories,
          errorMessage: t('misc.apiErrors.categories'),
        },
      ],
      setIsLoading,
      setApiError,
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
      <h1 className={styles.heading}>{heading}</h1>
      {isLoading ? (
        <Loading />
      ) : apiError.includes(t('misc.apiErrors.products')) ? (
        <ErrorMessage
          identifier={t('misc.apiErrors.errorHeading')}
          errorMessage={apiError}
        />
      ) : (
        <>
          <ProductsFilter
            categories={categories}
            filter={filter}
            setFilter={setFilter}
            products={products}
          />
          {filteredItems.length > 0 ? (
            <GalleryItems
              isShop={isShop}
              filteredItems={filteredItems}
              products={products}
            />
          ) : (
            <div className={styles.noResults}>
              <p>{t('gallery.noResults')}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MainGallery;
