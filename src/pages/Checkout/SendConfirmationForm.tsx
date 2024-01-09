import {
  type ShoppingCartItem,
  type OrderDetails,
} from '@interfaces/interfaces';
import i18n from 'i18next';

const sendConfirmationData = async (
  orderData: OrderDetails,
  shoppingCart: ShoppingCartItem[] | null,
  mailTo: string,
  url: string,
): Promise<void> => {
  const subject = i18n.t('contact.form.subject', { name: orderData.surname });

  const fetchBodyData = new URLSearchParams();
  fetchBodyData.append('to', mailTo);
  fetchBodyData.append('from', mailTo);
  fetchBodyData.append('subject', subject);
  fetchBodyData.append(
    'address',
    `${orderData.streetName}, ${orderData.areaCode}, ${orderData.cityName}`,
  );

  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: fetchBodyData.toString(),
  // });

  // if (!response.ok) {
  //   throw new Error(`HTTP error! Status: ${response.status}`);
  // }

  // return await response.json();
  console.log(orderData);
  console.log(shoppingCart);
  console.log(fetchBodyData);
};

export { sendConfirmationData };
