import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import { fetchData } from '@utils/api';
import {
  type Product,
  type Category,
  type Filter,
  type MetaData,
} from '@interfaces/interfaces';

import ProductsFilter from '@components/GalleryItems/ProductsFilter/ProductsFilter';
import GalleryItems from '@components/GalleryItems/GalleryItems';

import styles from './MainGallery.module.scss';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import Loading from '@components/Spinner/Loading/Loading';
import Pagination from '@components/Pagination/Pagination';

interface Props {
  isShop: boolean;
  heading: string;
  passedStyles: any;
}

const MainGallery = ({ isShop, heading, passedStyles }: Props): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>({
    category: null,
    rangeValues: [0, 10000],
  });
  const [paginationIndex, setPaginationIndex] = useState<number>(1);
  const pageSize = 48;

  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { locale } = useContext(UserContext);
  const { t } = useTranslation();

  const fetchProducts = (): void => {
    const categoryFilter =
      filter.category != null && filter.category !== t('misc.all')
        ? `&filters[product_category][slug][$eq]=${filter.category}`
        : '';

    void fetchData(
      [
        {
          url: `/api/items?populate=*&sort[createdAt]=DESC&pagination[page]=${paginationIndex}&pagination[pageSize]=${pageSize}${
            isShop ? '&filters[$and][0][amount][$gte]=1' : ''
          }${categoryFilter}`,
          setData: setProducts,
          errorMessage: t('misc.apiErrors.products'),
          setMetaData,
        },
        {
          url: `/api/product-categories?sort=slug:ASC&locale=${locale}`,
          setData: setCategories,
          errorMessage: t('misc.apiErrors.categories'),
        },
      ],
      setIsLoading,
      setApiError,
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [locale, paginationIndex, filter.category]);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const price = product.attributes.price;
      const categoryMatch =
        filter.category === null ||
        filter.category === t('misc.all') ||
        product.attributes.product_category.data.some(
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
      <ProductsFilter
        categories={categories}
        filter={filter}
        setFilter={setFilter}
        products={products}
      />
      {isLoading ? (
        <Loading />
      ) : apiError.includes(t('misc.apiErrors.products')) &&
        products !== null ? (
        <ErrorMessage
          identifier={t('misc.apiErrors.errorHeading')}
          errorMessage={apiError}
        />
      ) : (
        <>
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
      <Pagination
        pagination={metaData?.pagination}
        onPageChange={(newPage) => {
          setPaginationIndex(newPage);
        }}
      />
    </div>
  );
};

export default MainGallery;
