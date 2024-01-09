import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PhoneIcon } from '@assets/icons/phone.svg';
import { ReactComponent as AddressIcon } from '@assets/icons/home.svg';
import { ReactComponent as EmailIcon } from '@assets/icons/mail.svg';
import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import ContactForm from '@pages/Contact/ContactForm/ContactForm';

import styles from './Contact.module.scss';

interface Details {
  mail: string;
  number: string;
  address: string;
}

const Contact = (): JSX.Element => {
  const { t } = useTranslation();
  // const [myMail, setMyMail] = useState<string>('example@example.com');
  const [myDetails, setMyDetails] = useState<Details>({
    mail: 'example@example.com',
    number: '(+00) 000-0000000',
    address: 'Highbury Lane, Leeds',
  });

  useEffect(() => {
    const generateEmail = (): void => {
      const user = 'info';
      const domain = 'tobiasbergstedt.se';

      const country = '(+46)';
      const area = '070';
      const number = '9535019';

      // setMyMail(user + '@' + domain);
      setMyDetails({
        mail: `${user}@${domain}`,
        number: `${country} ${area}-${number}`,
        address: 'Väröbacka, Varberg',
      });
    };

    generateEmail();
  }, []);

  const cards = [
    {
      icon: <PhoneIcon className={styles.icon} />,
      text: myDetails.number,
    },
    {
      icon: <AddressIcon className={styles.icon} />,
      text: myDetails.address,
    },
    {
      icon: <EmailIcon className={styles.icon} />,
      text: myDetails.mail,
    },
  ];

  return (
    <div className={styles.contactContainer}>
      <SEOHelmet
        title={t('helmet.contact.title')}
        description={t('helmet.contact.description')}
      />
      <h1 className={styles.heading}>{t('contact.heading')}</h1>
      <div className={styles.contactCardsContainer}>
        {cards.map(({ icon, text }, index) => (
          <div className={styles.card} key={index}>
            {icon}
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className={styles.formAndTextContainer}>
        <ContactForm mailTo={myDetails.mail} />
        <div className={styles.contactMeContainer}>
          <h2 className={styles.messageMeHeading}>{t('contact.messageMe')}</h2>
          <p className={styles.messageMeText}>{t('contact.messageMeText')}</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
