import { HelmetProvider } from 'react-helmet-async';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';

import useBreakpoint, { DESKTOP } from '@hooks/useBreakpoint';
import { UserProvider } from '@context/UserContext';

import Start from '@pages/Start/Start';
import NotFound from '@pages/NotFound/NotFound';
import Gallery from '@pages/Gallery/Gallery';
import ForSale from '@pages/ForSale/ForSale';
// import Custom from '@pages/Custom/Custom';
import About from '@pages/About/About';
import Contact from '@pages/Contact/Contact';
import Checkout from '@pages/Checkout/Checkout';
import OrderConfirmation from '@pages/OrderConfirmation/OrderConfirmation';
import News from '@pages/News/News';
import NewsItem from '@pages/News/NewsItem/NewsItem';
import Events from '@pages/Events/Events';

import Header from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import SocialMedia from '@components/SocialMedia/SocialMedia';
import SingleItem from '@components/SingleItem/SingleItem';

import './App.scss';
import PastEvents from '@pages/Events/PastEvents/PastEvents';

const App = (): JSX.Element => {
  const location = useLocation();

  // const [navMenuHeight, setNavMenuHeight] = useState<number>(0);
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // useEffect(() => {
  //   const handleResize = (): void => {
  //     setWindowHeight(window.innerHeight);
  //   };
  //   window.addEventListener('resize', handleResize);

  //   if (navMenuRef.current != null) {
  //     const headerHeight = getComputedStyle(document.documentElement)
  //       .getPropertyValue('--header-height-mobile')
  //       .trim();

  //     const headerHeightValue = parseFloat(headerHeight.slice(0, -2));

  //     const height = navMenuRef.current.offsetHeight + headerHeightValue;
  //     setNavMenuHeight(height);

  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }
  // }, []);

  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === DESKTOP;
  // const isMobile = breakpoint === MOBILE;

  // const navMenuRef = useRef(null);

  return (
    <UserProvider>
      <HelmetProvider>
        <div className="app">
          {isDesktop && <SocialMedia isDesktop={isDesktop} />}
          <Header />
          <main
          // style={
          //   isMobile
          //     ? {
          //         minHeight:
          //           navMenuHeight > windowHeight ? navMenuHeight : '100vh',
          //       }
          //     : {
          //         minHeight:
          //           'calc(100vh - calc(var(--main-margin-top) + var(--footer-height)))',
          //       }
          // }
          >
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:uuid" element={<NewsItem />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/past" element={<PastEvents />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route
                path="/product/:uuid"
                element={<SingleItem key={location.pathname} />}
              />
              <Route path="/shop" element={<ForSale />} />
              {/* <Route path="/custom" element={<Custom />} /> */}
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
