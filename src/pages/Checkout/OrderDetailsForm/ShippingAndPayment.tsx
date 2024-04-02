import React from 'react';
import { useTranslation } from 'react-i18next';
import Radio from '@components/Inputs/Radio/Radio';
import Select from '@components/Inputs/Select/Select';
import { type OrderDetailsRefs, type FormState } from '@interfaces/interfaces';
import styles from '../Checkout.module.scss';

interface ShippingAndPaymentProps {
  formState: FormState;
  onOptionChange: (value: string, field: keyof FormState) => void;
  configRefs: OrderDetailsRefs;
}

const ShippingAndPayment = ({
  formState,
  onOptionChange,
  configRefs,
}: ShippingAndPaymentProps): JSX.Element => {
  const { t } = useTranslation();

  // Define your options here, or pass them as props
  const radioOptions = [
    { value: 'pickup', label: t('checkout.pickup') },
    { value: 'ship', label: t('checkout.shipTo') },
  ];

  const paymentOptions = [
    { value: 'swish', label: t('checkout.swish') },
    { value: 'card', label: t('checkout.card') },
    { value: 'cash', label: t('checkout.cash') },
  ];

  const countrySelectValues = [
    { value: 'SE', label: t('checkout.form.countries.sweden') },
    { value: 'EU', label: t('checkout.form.countries.eu') },
    { value: 'Other', label: t('checkout.form.countries.other') },
  ];

  return (
    <div className={styles.shippingAndPaymentContainer}>
      <h3 className={styles.shippingAndPaymentHeading}>
        {t('checkout.shippingAndPayment')}
      </h3>
      <Radio
        options={radioOptions}
        selectedOption={formState.pickup}
        onOptionChange={(e) => {
          onOptionChange(e, 'pickup');
        }}
      />
      {formState.pickup === 'ship' && (
        <>
          <p className={styles.shipToHeading}>{t('checkout.shipToHeading')}:</p>
          <Select
            className={styles.countrySelect}
            label={t('checkout.form.countryName')}
            options={countrySelectValues}
            defaultValue={formState.country}
            onChange={(e) => {
              onOptionChange(e, 'country');
            }}
            ref={configRefs.country}
          />
        </>
      )}
      <p className={styles.shipToHeading}>{t('checkout.paymentViaHeading')}:</p>
      <Radio
        options={
          formState.pickup === 'ship'
            ? paymentOptions.slice(0, 1)
            : paymentOptions
        }
        selectedOption={formState.payment}
        onOptionChange={(e) => {
          onOptionChange(e, 'payment');
        }}
      />
    </div>
  );
};

export default ShippingAndPayment;
