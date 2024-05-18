import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Community from './pages/community/CommunityMain';
import ViewPostDetail from './pages/community/ViewPostDetail';
import NewPost from './pages/community/NewPost';
import RoutineMain from './pages/routine/RoutineMain';
import ViewRoutineDetail from './pages/routine/ViewRoutineDetail';
import NewRoutine from './pages/routine/NewRoutine';

import GlobalStyle from './styles/common/GlobalStyle';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import MuiFontTheme from './styles/common/MuiFontTheme';
import MainProduct from './pages/mall/mainProduct';
import Fitness from './pages/mall/fittness';
import Supplement from './pages/mall/supplemnet';
import Food from './pages/mall/food';
import ProductDetail from './pages/productDetail/productDetail';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Community />} />
          <Route path="/post/:postNo" element={<ViewPostDetail />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/routine" element={<RoutineMain />} />
          <Route path="/routine/:routineNo" element={<ViewRoutineDetail />} />
          <Route path="/new-routine" element={<NewRoutine />} />4{' '}
          <Route path="/mainProduct" element={<MainProduct />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/supplement" element={<Supplement />} />
          <Route path="/food" element={<Food />} />
          <Route path="/productDetail" element={<ProductDetail />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
