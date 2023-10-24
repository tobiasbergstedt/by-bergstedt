import { useTranslation } from 'react-i18next';

import MainGallery from '@components/GalleryItems/MainGallery';

const GalleryCopy = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <MainGallery
      isShop={false}
      heading={t('gallery.heading')}
      passedStyles={''}
    />
  );
};

export default GalleryCopy;
