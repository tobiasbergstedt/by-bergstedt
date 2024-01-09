import { type ContactFormData } from '@interfaces/interfaces';
import i18n from 'i18next';

const sendContactData = async (
  formData: ContactFormData,
  mailTo: string,
  url: string,
): Promise<void> => {
  const subject = i18n.t('contact.form.subject', { name: formData.name });
  const text = i18n.t('contact.form.text', {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  });

  const fetchBodyData = new URLSearchParams();
  fetchBodyData.append('to', mailTo);
  fetchBodyData.append('from', mailTo);
  fetchBodyData.append('subject', subject);
  fetchBodyData.append('text', text);

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
