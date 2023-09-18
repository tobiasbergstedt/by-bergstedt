import styles from './LanguagePicker.module.scss';
import GlobeIcon from '../../../assets/icons/globe.svg';
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrowdown.svg';
import { useContext, useState } from 'react';
import clsx from 'clsx';
import { UserContext } from '../../../context/UserContext';
import { i18n } from '../../../i18n/i18n';
import useBreakpoint, { DESKTOP } from '../../../hooks/useBreakpoint';

const LanguagePicker = (): JSX.Element => {
  const { languageChosen, setLanguageChosen } = useContext(UserContext);
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] =
    useState<boolean>(false);

  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;
  const languages = ['Svenska', 'English'];

  const toggleLanguagePicker = (): void => {
    setIsLanguagePickerOpen(!isLanguagePickerOpen);
  };

  const selectLanguage = async (language: string): Promise<void> => {
    setLanguageChosen(language);
    setIsLanguagePickerOpen(false); // Close the language picker when a language is selected
    if (language === 'Svenska') {
      await i18n.changeLanguage('sv');
    } else if (language === 'English') {
      await i18n.changeLanguage('en');
    }
  };

  return (
    <div
      className={clsx(styles.languagePickerContainer, {
        [styles.isLanguagePickerOpen]: isLanguagePickerOpen,
        [styles.isMobile]: !isDesktop,
      })}
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
