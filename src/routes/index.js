import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from 'pages/Landingpage';
import Signin from 'pages/Signin';
import Home from 'pages/Home';
import Menu from 'pages/Menu';
import history from '../history';
function Root() {
  return (
    <Router history={history}>
      <Routes>
        <Route exact path='/' element={<Signin />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/menu' element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default Root;
