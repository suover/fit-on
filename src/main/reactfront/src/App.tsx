import React from 'react';

import GlobalStyle from './styles/common/GlobalStyle';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import MuiFontTheme from './styles/common/MuiFontTheme';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Footer />
    </>
  );
}

export default App;
