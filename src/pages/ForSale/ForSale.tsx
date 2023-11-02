import { useTranslation } from 'react-i18next';

import MainGallery from '@components/GalleryItems/MainGallery';
import SEOHelmet from '@components/SEOHelmet/SEOHelmet';

import styles from './ForSale.module.scss';

const ForSaleCopy = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <SEOHelmet
        title={t('helmet.shop.title')}
        description={t('helmet.shop.description')}
      />
      <MainGallery
        isShop={true}
        heading={t('shop.heading')}
        passedStyles={styles}
      />
    </>
  );
};

export default ForSaleCopy;
