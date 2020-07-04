import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <BrowserRouter>
        <Routes />
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
