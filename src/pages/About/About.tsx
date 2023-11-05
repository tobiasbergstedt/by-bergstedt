import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserContext } from '@context/UserContext';
import { type AboutData } from '@interfaces/interfaces';
import { fetchData } from '@utils/api';
import { fixUrl } from '@utils';

import SEOHelmet from '@components/SEOHelmet/SEOHelmet';

import styles from './About.module.scss';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import Loading from '@components/Spinner/Loading/Loading';

const About = (): JSX.Element => {
  const { locale } = useContext(UserContext);
  const [aboutData, setAboutData] = useState<AboutData>();
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { t } = useTranslation();

  useEffect(() => {
    void fetchData(
      [
        {
          url: `/api/about-me?populate=profileImage,testimonials.image&locale=${locale}`,
          setData: setAboutData,
          errorMessage: t('misc.apiErrors.aboutData'),
        },
      ],
      setIsLoading,
      setApiError,
    );
  }, [locale]);

  return (
    <div className={styles.aboutContainer}>
      <SEOHelmet
        title={t('helmet.about.title')}
        description={t('helmet.about.description')}
      />
      {isLoading ? (
        <Loading />
      ) : apiError.length !== 0 ? (
        <ErrorMessage
          identifier={t('misc.apiErrors.errorHeading')}
          errorMessage={apiError}
        />
      ) : (
        <>
          <div className={styles.introductionContainer}>
            <img
              src={
                aboutData != null
                  ? fixUrl(
                      aboutData.attributes.profileImage.data.attributes.formats
                        .large.url,
                    )
                  : 'src/assets/images/tobias.png'
              }
              alt=""
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
            <div className={styles.testimonialsContainer}>
              {aboutData?.attributes.testimonials.data.map(
                ({ attributes }, index) => (
                  <div className={styles.testimonial} key={index}>
                    <p className={styles.testimonialTop}>
                      <span className={styles.quoteStart}>&#10077;</span>
                      {attributes.testimonial}
                      <span className={styles.quoteEnd}>&#10078;</span>
                    </p>
                    <div className={styles.testimonialBottom}>
                      <div className={styles.testimonialImageWrapper}>
                        <img
                          src={fixUrl(
                            attributes.image.data.attributes.formats.thumbnail
                              .url,
                          )}
                          alt={`Profile image of ${attributes.name}`}
                          className={styles.testimonialImage}
                        />
                      </div>
                      <p className={styles.testimonialName}>
                        {attributes.name}
                      </p>
                      <p className={styles.testimonialRole}>
                        {attributes.description}
                      </p>
                      {/* <span className={styles.backgroundFill} /> */}
                      <div
                        className={styles.decoration}
                        style={{
                          maskImage: `url(/src/assets/icons/testimonial-${
                            index + 1
                          }.svg)`,
                        }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
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
