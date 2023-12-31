import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import { RecoilRoot } from "recoil";
import App from './App';
import './index.scss';
import './styles/index.scss';
import { initializeI18n } from './i18n/i18n';

const startApp = async (): Promise<void> => {
  await initializeI18n();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Router>
        {/* <RecoilRoot> */}
        <App />
        {/* </RecoilRoot> */}
      </Router>
    </React.StrictMode>,
  );
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startApp();
