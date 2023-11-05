import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { UserContext } from '@context/UserContext';
import { type Category, type Product } from '@interfaces/interfaces';
import { fetchData } from '@utils/api';

import CartIcon from '@assets/icons/cart-white.svg';
import { ReactComponent as ArrowBack } from '@assets/icons/arrow-back.svg';
import Loading from '@components/Spinner/Loading/Loading';
import Button from '@components/Button/Button';
import ImageGallery from '@components/SingleItem/ImageGallery/ImageGallery';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';

import styles from './SingleItem.module.scss';

const SingleItem = (): JSX.Element => {
  const { locale } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | undefined>();
  const [product, setProduct] = useState<Product | null>(null);
  const [apiError, setApiError] = useState<string>('');

  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();

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
    const desiredCategorySlug =
      product?.attributes.categories.data[0].attributes.slug;
    const categorySlug = categories.find(
      (category) => category.attributes.slug === desiredCategorySlug,
    );

    setCategory(categorySlug);
  }, [categories]);

  console.log(apiError);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : product === null ||
        apiError.includes(t('misc.apiErrors.singleProduct')) ? (
        <ErrorMessage
          identifier={t('misc.apiErrors.errorHeading')}
          errorMessage={apiError}
        />
      ) : (
        <div className={styles.productContainer}>
          <div className={styles.arrowWrapper}>
            <Link to={'/gallery'}>
              <ArrowBack />
            </Link>
          </div>
          <ImageGallery product={product} />
          <div className={styles.infoContainer}>
            <h1 className={styles.productHeading}>
              {locale === product?.attributes.locale
                ? product?.attributes.title
                : product?.attributes.localizations.data[0].attributes.title}
            </h1>
            <p>
              {apiError.includes(t('misc.apiErrors.categories'))
                ? t('misc.apiErrors.category')
                : category?.attributes.singleName}
            </p>
            <div className={styles.priceContainer}>
              <p
                className={clsx(styles.priceParagraph, {
                  [styles.strikeThrough]: product.attributes.amount === 0,
                })}
              >
                {product?.attributes.price} {t('misc.currencies.sek')}
              </p>
              {product.attributes.amount === 0 ? (
                <p className={styles.productAmount}>{t('gallery.soldOut')}</p>
              ) : (
                <p>
                  {t('gallery.inStock')}:{' '}
                  <span className={styles.productAmount}>
                    {product?.attributes.amount}
                  </span>
                </p>
              )}
            </div>
            <p className={styles.productDescription}>
              {locale === product?.attributes.locale
                ? product?.attributes.description
                : product?.attributes.localizations.data[0].attributes
                    .description}
            </p>
            <Button
              isDisabled={product.attributes.amount === 0}
              hasIcon={CartIcon}
            >
              {t('gallery.addToCart')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleItem;
