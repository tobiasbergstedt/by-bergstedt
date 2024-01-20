import { useTranslation } from 'react-i18next';
import styles from '../OrderConfirmation.module.scss';

const OrderDetails = ({ order }: any): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.orderDetails}>
      <h2 className={styles.orderConfirmationsubHeading}>
        {t('checkout.confirmationMail.order')}
      </h2>
      <p className={styles.marginZero}>
        {t('checkout.confirmationMail.orderNumber')}: {order.attributes.orderId}
      </p>
      <p className={styles.marginZero}>
        {t('checkout.confirmationMail.orderDate')}:{' '}
        {order.attributes.createdAt.slice(0, 10)}
      </p>
      <p className={styles.marginZero}>
        {t('checkout.confirmationMail.pickup')}:{' '}
        {order.attributes.shippingInfo === 'pickup'
          ? t('checkout.pickup')
          : t('checkout.viaShipping')}
      </p>
      <p className={styles.marginZero}>
        {t('checkout.confirmationMail.payment')}:{' '}
        {order.attributes.paymentMethod === 'swish'
          ? t('checkout.swish')
          : order.attributes.paymentMethod === 'card'
          ? t('checkout.card')
          : t('checkout.cash')}
      </p>
      {order.attributes.userData.message.length !== 0 && (
        <p className={styles.message}>
          {t('checkout.confirmationMail.message')}:{' '}
          {order.attributes.userData.message}
        </p>
      )}
    </div>
  );
};

export default OrderDetails;
