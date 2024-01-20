import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { UserContext } from '@context/UserContext';
import { type Category, type Product } from '@interfaces/interfaces';
import { fetchData } from '@utils/api';
import formatPrice from '@utils/format-price';

import CartIcon from '@assets/icons/cart-white.svg';
import Loading from '@components/Spinner/Loading/Loading';
import Button from '@components/Button/Button';
import ImageGallery from '@components/SingleItem/ImageGallery/ImageGallery';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import Modal from '@components/Modal/Modal';

import { ReactComponent as CartErrorIcon } from '@assets/icons/cart-error.svg';

import styles from './SingleItem.module.scss';

const SingleItem = (): JSX.Element => {
  const { locale, shoppingCart, setShoppingCart } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | undefined>();
  const [product, setProduct] = useState<Product | null>(null);
  const [apiError, setApiError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();

  const updateCart = (product: Product): void => {
    const itemToAdd = {
      productId: product.attributes.uuid,
      strapiId: product.id,
      name: {
        sv: product.attributes.title,
        en: product.attributes.localizations.data[0].attributes.title,
      },
      amountAvailable: product.attributes.amount,
      amount: 1,
      image: product.attributes.images.data[0].attributes.formats.thumbnail.url,
      price: product.attributes.price,
      weight: product.attributes.weight,
    };

    if (shoppingCart !== null) {
      // Check if the item already exists in the cart
      const existingItemIndex = shoppingCart.findIndex(
        (item) => item.productId === itemToAdd.productId,
      );

      if (existingItemIndex !== -1) {
        // Item exists, update the amount if it doesn't exceed the max amount
        const existingItem = shoppingCart[existingItemIndex];
        if (existingItem.amount < product.attributes.amount) {
          // Clone the shoppingCart array and update the amount of the existing item
          const updatedCart = [...shoppingCart];
          updatedCart[existingItemIndex] = {
            ...existingItem,
            amount: existingItem.amount + 1,
          };
          setShoppingCart(updatedCart);
        } else {
          // Amount + 1 is too large, show an alert
          // alert(
          //   'You have added all available items of this type to your cart already.',
          // );
          setShowModal(true);
        }
        // If the existing amount is already at max, handle accordingly (e.g., show a message)
      } else {
        // Item does not exist, add it to the cart
        setShoppingCart([...shoppingCart, itemToAdd]);
      }
    } else {
      // ShoppingCart is empty, initialize it with the new item
      setShoppingCart([itemToAdd]);
    }
  };

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
  }, [locale]);

  useEffect(() => {
    const desiredCategorySlug =
      product?.attributes.product_category.data[0].attributes.slug;
    const categorySlug = categories.find(
      (category) => category.attributes.slug === desiredCategorySlug,
    );

    setCategory(categorySlug);
  }, [categories]);

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
          {/* <div className={styles.arrowWrapper}>
            <Link to={'/gallery'}>
              <ArrowBack />
            </Link>
          </div> */}
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
                {formatPrice(product?.attributes.price)}{' '}
                {t('misc.currencies.sek')}
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
              onClick={() => {
                updateCart(product);
              }}
            >
              {t('gallery.addToCart')}
            </Button>
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          hasCloseButton
          canClose
          onClick={() => {
            setShowModal(false);
          }}
        >
          <>
            <CartErrorIcon className={styles.failIcon} />
            <p className={styles.messageParagraph}>
              You have added all available items of this type to your cart
              already.
            </p>
          </>
        </Modal>
      )}
    </>
  );
};

export default SingleItem;
