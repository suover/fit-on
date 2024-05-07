import React from 'react';

import GlobalStyle from './styles/common/GlobalStyle';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';

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
