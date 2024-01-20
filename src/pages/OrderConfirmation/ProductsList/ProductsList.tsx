import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { UserContext } from '@context/UserContext';

import styles from '../OrderConfirmation.module.scss';

const ProductsList = ({ order }: any): JSX.Element => {
  const { locale } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <>
      <div className={clsx(styles.productsGrid, styles.gridMarginTop)}>
        <p>{t('checkout.confirmationMail.product')}</p>
        <p>{t('checkout.confirmationMail.amount')}</p>
        <p>{t('checkout.confirmationMail.price')}</p>
        <p>{t('checkout.confirmationMail.sum')}</p>
      </div>
      {order.attributes.orderDetails?.map((orderItem: any, index: number) => (
        <div className={clsx(styles.productsGrid, styles.divider)} key={index}>
          <p>{locale === 'sv' ? orderItem.name.sv : orderItem.name.en}</p>
          <p>{orderItem.amount}</p>
          <p>
            {orderItem.price} {t('misc.currencies.sek')}
          </p>
          <p>
            {orderItem.price * orderItem.amount} {t('misc.currencies.sek')}
          </p>
        </div>
      ))}
      <div className={clsx(styles.productsGrid, styles.productsContainer)}>
        <p>{t('checkout.confirmationMail.shipping')}</p>
        <p></p>
        <p></p>
        <p>
          {order.attributes.shipping} {t('misc.currencies.sek')}
        </p>
      </div>
      <div className={clsx(styles.productsGrid, styles.productsContainer)}>
        <p className={styles.boldParagraph}>
          {t('checkout.confirmationMail.total')}
        </p>
        <p></p>
        <p></p>
        <p className={styles.boldParagraph}>
          {order.attributes.totalSum} {t('misc.currencies.sek')}
        </p>
      </div>
    </>
  );
};

export default ProductsList;
