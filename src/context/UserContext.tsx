import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { local } from '@utils/storage';
import { LANGUAGE_CHOSEN, SHOPPING_CART } from '@config/constants';
import { setLanguage } from '@i18n/i18n';
import { useTranslation } from 'react-i18next';
import {
  type ShippingRate,
  type ShoppingCartItem,
} from '@interfaces/interfaces';
import fixUrl from '@utils/fix-url';

interface UserContextType {
  languageChosen: string | null;
  setLanguageChosen: Dispatch<SetStateAction<string | null>>;
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
  shoppingCart: ShoppingCartItem[] | null;
  setShoppingCart: Dispatch<SetStateAction<ShoppingCartItem[] | null>>;
  // cartTotal: number | string;
  // setCartTotal: Dispatch<SetStateAction<number | string>>;
  shippingRates: ShippingRate[] | null;
  setShippingRates: Dispatch<SetStateAction<ShippingRate[] | null>>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({
  languageChosen: null,
  setLanguageChosen: () => {},
  locale: 'sv',
  setLocale: () => {},
  shoppingCart: null,
  setShoppingCart: () => {},
  // cartTotal: 0,
  // setCartTotal: () => {},
  shippingRates: null,
  setShippingRates: () => {},
});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { t } = useTranslation();
  const [languageChosen, setLanguageChosen] = useState<string | null>(
    local.read(LANGUAGE_CHOSEN) ?? t('locales.swedish'),
  );
  const [locale, setLocale] = useState<string>(t('locales.sv'));
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[] | null>(
    local.read(SHOPPING_CART) ?? null,
  );
  const [shippingRates, setShippingRates] = useState<ShippingRate[] | null>(
    null,
  );

  // Update localStorage whenever languageChosen changes.
  useEffect(() => {
    if (languageChosen != null && languageChosen.length > 0) {
      local.write(LANGUAGE_CHOSEN, languageChosen);
    }
  }, [languageChosen]);

  useEffect(() => {
    // if (shoppingCart != null && shoppingCart.length > 0) {
    local.write(SHOPPING_CART, shoppingCart);
    // } else {
    //   local.write(SHOPPING_CART, null);
    // }
  }, [shoppingCart]);

  useEffect(() => {
    const fetchShippingRates = async (): Promise<void> => {
      try {
        const response = await fetch(fixUrl('/api/shipping-rates'));
        const data = await response.json();
        setShippingRates(data.data);
      } catch (error) {
        console.error('Error fetching shipping rates:', error);
      }
    };

    void fetchShippingRates();

    if (
      local.read(LANGUAGE_CHOSEN) !== null &&
      local.read(LANGUAGE_CHOSEN) === t('locales.english')
    ) {
      setLanguage(t('locales.en'));
      setLocale(t('locales.en'));
    } else {
      setLanguage(t('locales.sv'));
      setLocale(t('locales.sv'));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        languageChosen,
        setLanguageChosen,
        locale,
        setLocale,
        shoppingCart,
        setShoppingCart,
        shippingRates,
        setShippingRates,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
