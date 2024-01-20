import { type ContactFormData } from '@interfaces/interfaces';
import i18n from 'i18next';

const sendContactData = async (
  formData: ContactFormData,
  mailTo: string,
  url: string,
): Promise<void> => {
  const subject = i18n.t('contact.form.subject', { name: formData.name });
  const html = `
    <html>
      <head>
        <style>
        </style>
      </head>
      <body>
        <p>${i18n.t('contact.form.name')}: ${formData.name}</p>
        <p>${i18n.t('contact.form.email')}: ${formData.email}</p>
        <p>${i18n.t('contact.form.message')}: ${formData.message}</p>
      </body>
    </html>
  `;

  const fetchBodyData = new URLSearchParams();
  fetchBodyData.append('to', mailTo);
  fetchBodyData.append('from', mailTo);
  fetchBodyData.append('subject', subject);
  fetchBodyData.append('html', html);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: fetchBodyData.toString(),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

export { sendContactData };
