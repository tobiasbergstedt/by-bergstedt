/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRef, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import {
  type OrderDetailsRefs,
  type OrderDetails,
} from '@interfaces/interfaces';
import { getCartSum, getCartTotal, getShipping } from '@utils/cart';
import useFormState from '@hooks/useFormState';

import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import PersonalDetailsForm from './PersonalDetailsForm/PersonalDetailsForm';
import OrderDetailsForm from './OrderDetailsForm/OrderDetailsForm';

import styles from './Checkout.module.scss';
import useHandleSubmit from '@hooks/useHandleSubmit';
import Modal from '@components/Modal/Modal';
import Button from '@components/Button/Button';

const Checkout = (): JSX.Element => {
  const { shoppingCart, setShoppingCart, shippingRates } =
    useContext(UserContext);
  const personalDetailsInitial = {
    surname: '',
    lastName: '',
    companyName: '',
    streetName: '',
    areaCode: '',
    cityName: '',
    countryName: '',
    phoneNumber: '',
    email: '',
    message: '',
    country: '',
    pickup: 'pickup',
    payment: 'swish',
  };

  const [shippingCost, setShippingCost] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const optionalFields: Array<keyof OrderDetails> = [
    'companyName',
    'message',
    'country',
  ];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [apiSuccess, setApiSuccess] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [apiError, setApiError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { formState, setFormState, handleChange, validate, errors } =
    useFormState(personalDetailsInitial, optionalFields);

  const { t } = useTranslation();

  const configRefs: OrderDetailsRefs = {
    surname: useRef(null),
    lastName: useRef(null),
    companyName: useRef(null),
    streetName: useRef(null),
    areaCode: useRef(null),
    cityName: useRef(null),
    countryName: useRef(null),
    phoneNumber: useRef(null),
    email: useRef(null),
    message: useRef(null),
    country: useRef(null),
    pickup: useRef(null),
    payment: useRef(null),
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
    }
  };

  const acceptSubmit = async (e: any): Promise<void> => {
    setShowModal(false);
    await submitForm(e);
  };

  const submitForm = useHandleSubmit({
    formState,
    shoppingCart,
    setShoppingCart,
    shippingCost,
    cartTotal,
    setApiError,
    setIsLoading,
    setApiSuccess,
    validate,
  });

  useEffect(() => {
    if (shippingRates !== null) {
      if (formState.pickup === 'pickup') {
        setShippingCost(0);

        const total = getCartSum(shoppingCart);
        setCartTotal(total);
      } else {
        const cost = getShipping(
          shoppingCart,
          shippingRates,
          formState.country,
        );
        setShippingCost(cost);

        const total = getCartTotal(
          shoppingCart,
          shippingRates,
          formState.country,
        );
        setCartTotal(total);
      }
    }
  }, [shippingRates, shoppingCart, formState.country, formState.pickup]);

  return (
    <>
      <SEOHelmet
        title={t('helmet.checkout.title')}
        description={t('helmet.checkout.description')}
      />
      <div className={styles.checkoutContainer}>
        <h1 className={styles.checkoutHeading}>{t('checkout.heading')}</h1>
        <div className={styles.orderInfoContainer}>
          <p className={styles.orderInfo}>{t('checkout.orderInfo1')}</p>
          <p className={styles.orderInfo}>{t('checkout.orderInfo2')}</p>
          <p className={styles.orderInfo}>{t('checkout.orderInfo3')}</p>
        </div>
        <form className={styles.checkoutContent} onSubmit={handleSubmit}>
          <PersonalDetailsForm
            configRefs={configRefs}
            formState={formState}
            handleChange={handleChange}
            errors={errors}
          />
          <OrderDetailsForm
            shoppingCart={shoppingCart}
            formState={formState}
            setFormState={setFormState}
            configRefs={configRefs}
            shippingCost={shippingCost}
            cartTotal={cartTotal}
          />
        </form>
      </div>
      {showModal && (
        <Modal
          hasCloseButton
          canClose
          onClick={() => {
            setShowModal(false);
          }}
        >
          <>
            <p className={styles.messageParagraph}>
              {t('checkout.confirmOrder')}
            </p>
            <div className={styles.buttonsContainer}>
              <Button
                onClick={(e) => {
                  void acceptSubmit(e);
                }}
              >
                {t('misc.yes')}
              </Button>
              <Button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                {t('misc.no')}
              </Button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default Checkout;
