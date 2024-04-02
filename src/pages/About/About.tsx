import { useTranslation } from 'react-i18next';

import fixUrl from '@utils/fix-url';

import SEOHelmet from '@components/SEOHelmet/SEOHelmet';

import styles from './About.module.scss';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import Loading from '@components/Spinner/Loading/Loading';
import useFetchAboutData from './UseFetchAboutData/useFetchAboutData';
import Testimonials from './Testimonials/Testimonials';

const About = (): JSX.Element => {
  const { aboutData, apiError, isLoading } = useFetchAboutData();

  const { t } = useTranslation();

  return (
    <div className={styles.aboutContainer}>
      <SEOHelmet
        title={t('helmet.about.title')}
        description={t('helmet.about.description')}
      />
      {isLoading ? (
        <Loading />
      ) : apiError.length !== 0 || aboutData === null ? (
        <ErrorMessage
          identifier={t('misc.apiErrors.errorHeading')}
          errorMessage={apiError}
        />
      ) : (
        <>
          <div className={styles.introductionContainer}>
            <img
              src={fixUrl(
                aboutData.attributes.profileImage.data.attributes.formats.medium
                  .url,
              )}
              alt={t('about.profileImgAlt')}
              className={styles.profileImage}
            />
            <div className={styles.aboutTextContainer}>
              <h1 className={styles.aboutHeading}>
                {aboutData?.attributes.title}
              </h1>
              <p className={styles.aboutText}>
                {aboutData?.attributes.aboutText}
              </p>
            </div>
          </div>
          <div className={styles.testimonialsOuterContainer}>
            <h2 className={styles.testimonialsHeading}>
              {t('about.testimonialsHeading')}
            </h2>
            <Testimonials aboutData={aboutData} />
          </div>
          <div className={styles.valuesOuterContainer}>
            <h3 className={styles.valuesHeading}>
              {aboutData?.attributes.valuesTitle}
            </h3>
            <div className={styles.valuesInnerContainer}>
              <div className={styles.valuesTextContainer}>
                <p className={styles.valuesText}>
                  {aboutData?.attributes.valuesText}
                </p>
              </div>
              <div className={styles.valuesImageContainer}>
                <img
                  src={'src/assets/images/DSC_0021.JPG'}
                  alt="Values Image"
                  className={styles.valuesImage}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default About;
