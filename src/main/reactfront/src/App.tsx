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

          <Route path="/new-routine" element={<NewRoutine />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
