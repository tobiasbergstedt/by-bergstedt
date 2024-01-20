import { useTranslation } from 'react-i18next';
import styles from '../OrderConfirmation.module.scss';

const UserDetails = ({ order }: any): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.marginTop}>
      <h2 className={styles.orderConfirmationsubHeading}>
        {t('checkout.confirmationMail.customerDetails')}
      </h2>
      <div className={styles.userDataGrid}>
        <span>
          <p className={styles.marginZero}>
            {order.attributes.userData.name}
            {order.attributes.userData.company.length > 0 &&
              ` (${order.attributes.userData.company})`}
          </p>
          <p className={styles.marginZero}>
            {order.attributes.userData.address}
          </p>
        </span>
        <span>
          <p className={styles.marginZero}>
            {order.attributes.userData.phoneNumber}
          </p>
          <p className={styles.marginZero}>{order.attributes.userData.email}</p>
        </span>
      </div>
    </div>
  );
};

export default UserDetails;
