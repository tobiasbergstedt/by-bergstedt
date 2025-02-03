import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import { type Category, type Product } from '@interfaces/interfaces';
import useFetchProduct from './useFetchProduct';

import Loading from '@components/Spinner/Loading/Loading';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import Modal from '@components/Modal/Modal';

import { ReactComponent as CartErrorIcon } from '@assets/icons/cart-error.svg';

import styles from './SingleItem.module.scss';
import ProductDetails from './ProductDetails/ProductDetails';

const SingleItem = (): JSX.Element => {
  const { shoppingCart, setShoppingCart } = useContext(UserContext);
  const [category, setCategory] = useState<Category | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const { product, categories, isLoading, apiError } = useFetchProduct(uuid);

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
          setShowModal(true);
        }
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
    if (product != null && categories != null) {
      const desiredCategorySlug =
        product.attributes.product_category.data[0].attributes.slug;
      const categorySlug = categories.find(
        (category) => category.attributes.slug === desiredCategorySlug,
      );

      setCategory(categorySlug);
    }
  }, [product, categories]);

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
        <ProductDetails
          product={product}
          category={category}
          updateCart={updateCart}
          apiError={apiError}
        />
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
              {t('gallery.allItemsInCartAlready')}
            </p>
          </>
        </Modal>
      )}
    </>
  );
};

export default SingleItem;
