import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchData } from '@utils/api';
import { type OrderData } from '@interfaces/interfaces';

import Loading from '@components/Spinner/Loading/Loading';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import UserDetails from './UserDetails/UserDetails';
import OrderDetails from './OrderDetails/OrderDetails';
import ProductsList from './ProductsList/ProductsList';
import SEOHelmet from '@components/SEOHelmet/SEOHelmet';

import { ReactComponent as ConfirmationIcon } from '@assets/icons/message-sent.svg';

import styles from './OrderConfirmation.module.scss';

const OrderConfirmation = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');
  const [order, setOrder] = useState<OrderData>();

  const { uuid } = useParams<{ uuid: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    void fetchData(
      [
        {
          url: `/api/orders?filters[$and][0][orderId][$eq]=${uuid}&populate[userData]=userData&populate[orderDetails][populate][1]=name`,
          setData: setOrder,
          errorMessage: t('misc.apiErrors.orderConfirmation', { id: uuid }),
          fetchSingleItem: true,
        },
      ],
      setIsLoading,
      setApiError,
    );
  }, []);

  return (
    <>
      <SEOHelmet
        title={t('helmet.orderConfirmation.title')}
        description={t('helmet.orderConfirmation.description')}
      />
      <div className={styles.confirmationWrapper}>
        {isLoading ? (
          <Loading />
        ) : apiError.length !== 0 || order === undefined ? (
          <ErrorMessage
            identifier={t('misc.apiErrors.errorHeading')}
            errorMessage={apiError}
          />
        ) : (
          <div className={styles.confirmationContainer}>
            <ConfirmationIcon className={styles.confirmationIcon} />
            <h1 className={styles.orderConfirmationHeading}>
              {t('checkout.confirmationMail.confirmation')}
            </h1>
            <p>
              {t('checkout.confirmationMail.thankCustomer', {
                name: order?.attributes.userData.name,
              })}
              !
            </p>
            <p className={styles.marginZero}>
              {order.attributes.shippingInfo === 'pickup'
                ? t('checkout.confirmationMail.pickupOrderReceived')
                : t('checkout.confirmationMail.deliveryOrderReceived')}
            </p>
            <UserDetails order={order} />
            <OrderDetails order={order} />
            <ProductsList order={order} />
            <h2 className={styles.orderConfirmationsubHeading}>
              {t('checkout.confirmationMail.rightOfWithdrawalHeading')}
            </h2>
            <p>{t('checkout.confirmationMail.rightOfWithdrawalText')}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderConfirmation;
