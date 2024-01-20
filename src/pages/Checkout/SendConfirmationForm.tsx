import i18n from 'i18next';

import fixUrl from '@utils/fix-url';
import {
  type ShoppingCartItem,
  type OrderDetails,
} from '@interfaces/interfaces';

const sendConfirmationData = async (
  orderData: OrderDetails,
  shoppingCart: ShoppingCartItem[] | null,
  orderId: string,
  shipping: string,
  cartTotal: string,
  url: string,
  setApiError: (data: string) => void,
  locale: string,
): Promise<void> => {
  const apiKey = import.meta.env.VITE_STRAPI_API_KEY;

  const date = new Date().toLocaleDateString();
  const currency = i18n.t('misc.currencies.sek');

  const byBergstedtLogo = (): string => {
    return `<img src="https://tobiasbergstedt.se/src/assets/icons/logo.svg" style="width: 50%; max-width: 250px" />`;
  };
  const orderItemsHtml = shoppingCart
    ?.map((orderItem) => {
      const itemName = locale === 'sv' ? orderItem.name.sv : orderItem.name.en;
      const itemAmount = orderItem.amount;
      const itemPrice = orderItem.price;
      const totalPrice = orderItem.price * orderItem.amount;

      return `
        <tr style="margin: 0; border-bottom: 1px solid black;">
          <td>${itemName}</td>
          <td>${itemAmount}</td>
          <td>${itemPrice} ${currency}</td>
          <td>${totalPrice} ${currency}</td>
        </tr>
      `;
    })
    .join('');

  const renderMessage = (): string => {
    if (orderData.message.length !== 0) {
      return `<p style="margin: 0;">
      ${i18n.t('checkout.confirmationMail.message')}: ${orderData.message}
    </p>`;
    } else {
      return `<p></p>`;
    }
  };

  const subject = i18n.t('checkout.confirmationMail.subject');
  const html = `
    <html>
      <body>
        <div style="background-color: white; color: black; max-width: 600px;>
          <p style="color: white;">${new Date().toLocaleString()}</p>
          ${byBergstedtLogo()}
          <h1 style="font-size: 30px; font-weight: 600;">${i18n.t(
            'checkout.confirmationMail.confirmation',
          )}</h1>
          <p style="font-size: 16px;">${i18n.t(
            'checkout.confirmationMail.thankCustomer',
            { name: orderData.surname + ' ' + orderData.lastName },
          )}!</p>
          <p style="font-size: 16px;">
          ${
            orderData.pickup === 'pickup'
              ? i18n.t('checkout.confirmationMail.pickupOrderReceived')
              : i18n.t('checkout.confirmationMail.deliveryOrderReceived')
          }
          </p>
          <div style="margin-top: 24px;">
            <h2 style="font-size: 24px;">${i18n.t(
              'checkout.confirmationMail.customerDetails',
            )}</h2>
            <table  style="width: 100%;">
              <td>
                <p style="margin: 0;">${orderData.surname} ${
                  orderData.lastName
                } ${
                  orderData.companyName.length > 0
                    ? `(${orderData.companyName})`
                    : ``
                }</p>
                <p style="margin: 0;">${orderData.streetName}</p>
                <p style="margin: 0;">${orderData.areaCode} ${
                  orderData.cityName
                }</p>
                <p style="margin: 0;">${orderData.country}</p>
              </td>
              <td style="vertical-align: top;">
                <p style="margin: 0;">${orderData.phoneNumber}</p>
                <p style="margin: 0;">${orderData.email}</p>
              </td>
            </table >
          </div>
          <div style="margin-top: 24px;">
            <h2 style="font-size: 24px;">${i18n.t(
              'checkout.confirmationMail.order',
            )}</h2>
            <p style="margin: 0;">${i18n.t(
              'checkout.confirmationMail.orderNumber',
            )}: ${orderId}</p>
            <p style="margin: 0;">${i18n.t(
              'checkout.confirmationMail.orderDate',
            )}: ${date}</p>
            <p style="margin: 0;">${i18n.t(
              'checkout.confirmationMail.payment',
            )}: ${
              orderData.payment === 'swish'
                ? i18n.t('checkout.swish')
                : orderData.payment === 'card'
                ? i18n.t('checkout.card')
                : i18n.t('checkout.cash')
            }</p>
            ${renderMessage()}
          </div>
          <table style="width: 100%; margin-top: 24px; border-collapse: collapse;">
            <tr style="font-weight: 600; margin-bottom: 8px;">
              <td>${i18n.t('checkout.confirmationMail.product')}</td>
              <td>${i18n.t('checkout.confirmationMail.amount')}</td>
              <td>${i18n.t('checkout.confirmationMail.price')}</td>
              <td>${i18n.t('checkout.confirmationMail.sum')}</td>
            </tr>
            ${orderItemsHtml}
            <tr>
                <td colspan="4" style="height: 8px;"></td>
            </tr>
            <tr style="margin-top: 16px;">
              <td>${i18n.t('checkout.confirmationMail.shipping')}</td>
              <td></td>
              <td></td>
              <td>${shipping} ${currency}</td>
            </tr>
            <tr>
                <td colspan="4" style="height: 16px;"></td>
            </tr>
            <tr style="font-weight: 600;">
              <td>${i18n.t('checkout.confirmationMail.total')}</td>
              <td></td>
              <td></td>
              <td>${cartTotal} ${currency}</td>
            </tr>
          </table>
          <h2 style="font-size: 24px;">${i18n.t(
            'checkout.confirmationMail.rightOfWithdrawalHeading',
          )}</h2>
          <p>
          ${i18n.t('checkout.confirmationMail.rightOfWithdrawalText')}
          </p>
        </div>
      </body>
    </html>
  `;

  const fetchBodyData = new URLSearchParams();
  fetchBodyData.append('to', orderData.email);
  fetchBodyData.append('from', 'info@tobiasbergstedt.se');
  fetchBodyData.append('bcc', 'info@tobiasbergstedt.se');
  fetchBodyData.append('subject', subject);
  fetchBodyData.append('html', html);

  const response = await fetch(fixUrl(url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${apiKey}`,
    },
    body: fetchBodyData.toString(),
  });

  if (!response.ok) {
    setApiError(
      'Something went wrong while trying to mail your order confirmation.',
    );
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
  // console.log(orderData);
  // console.log(shoppingCart);
};

export { sendConfirmationData };
