import { useTranslation } from 'react-i18next';

import MainGallery from '@components/GalleryItems/MainGallery';

import styles from './ForSale.module.scss';

const ForSaleCopy = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <MainGallery
      isShop={true}
      heading={t('shop.heading')}
      passedStyles={styles}
    />
  );
};

export default ForSaleCopy;
