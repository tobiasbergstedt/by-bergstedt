import { useState, useEffect, useContext } from 'react';
import { fetchData } from '@utils/api';
import { useTranslation } from 'react-i18next';
import { UserContext } from '@context/UserContext';
import { type AboutData } from '@interfaces/interfaces';

const useFetchAboutData = (): {
  aboutData: null | AboutData;
  apiError: string;
  isLoading: boolean;
} => {
  const { locale } = useContext(UserContext);
  const [aboutData, setAboutData] = useState(null);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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

  return { aboutData, apiError, isLoading };
};

export default useFetchAboutData;
