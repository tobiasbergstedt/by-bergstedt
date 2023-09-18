import { useEffect } from 'react';
import './App.scss';
import { Navigate, Routes, Route } from 'react-router-dom';
import Start from './pages/Start/Start';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import MyFooter from './components/Footer/Footer';
import useBreakpoint, { DESKTOP } from './hooks/useBreakpoint';
import SocialMedia from './components/SocialMedia/SocialMedia';
import { UserProvider } from './context/UserContext';
// import { useRecoilState } from 'recoil'
// import allHamstersAtom from './atoms/Hamsters'
// import { fixUrl } from './utils'

const App = (): JSX.Element => {
  // const [allHamstersData, setAllHamstersData] = useRecoilState<Hamster[]>(allHamstersAtom)

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
      <div className="app">
        {isDesktop && <SocialMedia isDesktop={isDesktop} />}
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </main>
        <footer>{isDesktop && <MyFooter />}</footer>
      </div>
    </UserProvider>
  );
};

export default App;
