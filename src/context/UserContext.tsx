import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { local } from "../utils/storage";
import { LANGUAGE_CHOSEN } from "../config/constants";
import { setLanguage } from "../i18n/i18n";

interface UserContextType {
  languageChosen: string | null;
  setLanguageChosen: Dispatch<SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [languageChosen, setLanguageChosen] = useState<string | null>(() => {
    const storedLanguage = local.read(LANGUAGE_CHOSEN) as string | null;
    return storedLanguage ?? "Svenska";
  });

  // Update localStorage whenever languageChosen changes.
  useEffect(() => {
    if (languageChosen != null && languageChosen.length > 0) {
      local.write(LANGUAGE_CHOSEN, languageChosen);
    }
  }, [languageChosen]);

  useEffect(() => {
    if (
      local.read(LANGUAGE_CHOSEN) !== null &&
      local.read(LANGUAGE_CHOSEN) === "English"
    ) {
      setLanguage("en");
    } else {
      setLanguage("sv");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        languageChosen,
        setLanguageChosen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
