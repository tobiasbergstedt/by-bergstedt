import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';

import useBreakpoint, { DESKTOP } from '@hooks/useBreakpoint';
import { UserProvider } from '@context/UserContext';

import Start from '@pages/Start/Start';
import NotFound from '@pages/NotFound/NotFound';
import Gallery from '@pages/Gallery/Gallery';
import ForSale from '@pages/ForSale/ForSale';
import Custom from '@pages/Custom/Custom';
import About from '@pages/About/About';
import Contact from '@pages/Contact/Contact';
import Checkout from '@pages/Checkout/Checkout';
import OrderConfirmation from '@pages/OrderConfirmation/OrderConfirmation';

import Header from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import SocialMedia from '@components/SocialMedia/SocialMedia';
import SingleItem from '@components/SingleItem/SingleItem';

import './App.scss';
// import { useRecoilState } from 'recoil'
// import allHamstersAtom from './atoms/Hamsters'
// import fixUrl from '@utils/fix-url';

const App = (): JSX.Element => {
  // const [allHamstersData, setAllHamstersData] = useRecoilState<Hamster[]>(allHamstersAtom)

  const location = useLocation();

  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;

  useEffect(() => {
    // async function getData() {
    //   const response: Response = await fetch(fixUrl('/hamsters'))
    //   const apiData: any = await response.json()
    //   setAllHamstersData(apiData as Hamster[])
    // }
    // getData()
  }, []);

  return (
    <UserProvider>
      <HelmetProvider>
        <div className="app">
          {isDesktop && <SocialMedia isDesktop={isDesktop} />}
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route
                path="/product/:uuid"
                element={<SingleItem key={location.pathname} />}
              />
              <Route path="/shop" element={<ForSale />} />
              <Route path="/custom" element={<Custom />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/orderconfirmation/:uuid"
                element={<OrderConfirmation />}
              />

              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </main>
          <footer>{isDesktop && <MyFooter />}</footer>
        </div>
      </HelmetProvider>
    </UserProvider>
  );
};

export default App;
