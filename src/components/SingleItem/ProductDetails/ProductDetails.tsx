import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { UserContext } from '@context/UserContext';
import { type Category, type Product } from '@interfaces/interfaces';
import formatPrice from '@utils/format-price';

import ImageGallery from '@components/SingleItem/ImageGallery/ImageGallery';
import Button from '@components/Button/Button';

import CartIcon from '@assets/icons/cart-white.svg';

import styles from './ProductDetails.module.scss';

interface ProductDetailsProps {
  product: Product;
  category: Category | undefined;
  updateCart: (product: Product) => void;
  apiError: string;
}

const ProductDetails = ({
  product,
  category,
  updateCart,
  apiError,
}: ProductDetailsProps): JSX.Element => {
  const { locale } = useContext(UserContext);

  const { t } = useTranslation();

  return (
    <div className={styles.productContainer}>
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
            {formatPrice(product?.attributes.price)} {t('misc.currencies.sek')}
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
            : product?.attributes.localizations.data[0].attributes.description}
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
  );
};

export default ProductDetails;
