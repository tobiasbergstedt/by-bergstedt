import React from 'react';
import { useTranslation } from 'react-i18next';
import formatPrice from '@utils/format-price';
import styles from '../Checkout.module.scss';

interface OrderTotalsProps {
  shippingCost: number;
  cartTotal: number;
}

const OrderTotals = ({
  shippingCost,
  cartTotal,
}: OrderTotalsProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.checkoutTotal}>
        <p>{t('checkout.shippingLabel')}:</p>
        <p>{`${formatPrice(shippingCost)} ${t('misc.currencies.sek')}`}</p>
      </div>
      <div className={styles.checkoutTotal}>
        <p>{t('shoppingCart.total')}:</p>
        <p>{`${formatPrice(cartTotal)} ${t('misc.currencies.sek')}`}</p>
      </div>
    </>
  );
};

export default OrderTotals;
