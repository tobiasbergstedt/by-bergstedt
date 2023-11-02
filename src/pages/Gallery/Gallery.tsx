import { useTranslation } from 'react-i18next';

import MainGallery from '@components/GalleryItems/MainGallery';
import SEOHelmet from '@components/SEOHelmet/SEOHelmet';

const GalleryCopy = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <SEOHelmet
        title={t('helmet.gallery.title')}
        description={t('helmet.gallery.description')}
      />
      <MainGallery
        isShop={false}
        heading={t('gallery.heading')}
        passedStyles={''}
      />
    </>
  );
};

export default GalleryCopy;
