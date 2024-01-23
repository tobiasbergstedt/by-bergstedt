import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '@context/UserContext';
import { fetchData } from '@utils/api';
import { type Category, type Product } from '@interfaces/interfaces';

const useFetchProduct = (
  uuid: string | undefined,
): {
  product: Product | null;
  categories: Category[] | null;
  isLoading: boolean;
  apiError: string;
} => {
  const { locale } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    void fetchData(
      [
        {
          url: `/api/items?populate=*&filters[$and][0][uuid][$eq]=${uuid}`,
          setData: setProduct,
          errorMessage: t('misc.apiErrors.singleProduct'),
          fetchSingleItem: true,
        },
        {
          url: `/api/product-categories?sort=name:ASC&locale=${locale}`,
          setData: setCategories,
          errorMessage: t('misc.apiErrors.categories'),
        },
      ],
      setIsLoading,
      setApiError,
    );
  }, [uuid, locale, t]);

  return { product, categories, isLoading, apiError };
};

export default useFetchProduct;
