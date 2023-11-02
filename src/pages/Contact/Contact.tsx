import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import { useTranslation } from 'react-i18next';

const Contact = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%', flexGrow: 1 }}>
      <SEOHelmet
        title={t('helmet.contact.title')}
        description={t('helmet.contact.description')}
      />
      Contact
    </div>
  );
};

export default Contact;
