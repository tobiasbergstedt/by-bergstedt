import styles from './LanguagePicker.module.scss';
import GlobeIcon from '../../../assets/icons/globe.svg';
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrowdown.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { UserContext } from '../../../context/UserContext';
import { i18n } from '../../../i18n/i18n';
import useBreakpoint, { DESKTOP } from '../../../hooks/useBreakpoint';
import { useTranslation } from 'react-i18next';

const LanguagePicker = (): JSX.Element => {
  const { languageChosen, setLanguageChosen } = useContext(UserContext);
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] =
    useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;
  const languages = [t('locales.swedish'), t('locales.english')];

  const toggleLanguagePicker = (): void => {
    setIsLanguagePickerOpen(!isLanguagePickerOpen);
  };

  const selectLanguage = async (language: string): Promise<void> => {
    setLanguageChosen(language);
    setIsLanguagePickerOpen(false); // Close the language picker when a language is selected
    if (language === t('locales.swedish')) {
      await i18n.changeLanguage(t('locales.sv'));
    } else if (language === t('locales.english')) {
      await i18n.changeLanguage(t('locales.en'));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        componentRef.current !== null &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsLanguagePickerOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={clsx(styles.languagePickerContainer, {
        [styles.isLanguagePickerOpen]: isLanguagePickerOpen,
        [styles.isMobile]: !isDesktop,
      })}
      ref={componentRef}
    >
      <div className={styles.languagePicker} onClick={toggleLanguagePicker}>
        <div
          className={styles.globeIcon}
          style={{
            maskImage: `url(${GlobeIcon})`,
            WebkitMaskImage: `url(${GlobeIcon})`,
          }}
        />
        <span className={styles.languageChosenWrapper}>
          <span className={styles.languageChosen}>
            {isDesktop ? languageChosen : languageChosen.slice(0, 2)}
          </span>
          <span
            className={clsx(styles.arrowDown, {
              [styles.isRotated]: isLanguagePickerOpen,
            })}
          >
            <ArrowDownIcon />
          </span>
        </span>
      </div>
      <ul
        className={clsx(styles.languagesList, {
          [styles.isInvisible]: !isLanguagePickerOpen,
          [styles.isMobile]: !isDesktop,
        })}
      >
        {languages.map((language: string) => (
          <li
            key={language}
            onClick={() => {
              void selectLanguage(language);
            }}
          >
            <input
              type="radio"
              checked={language === languageChosen}
              readOnly
            />
            <span className={styles.language}>{language}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguagePicker;
