import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import { useTranslation } from 'react-i18next';

const Custom = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%', flexGrow: 1 }}>
      <SEOHelmet
        title={t('helmet.custom.title')}
        description={t('helmet.custom.description')}
      />
      3D Designer
    </div>
  );
};

export default Custom;
