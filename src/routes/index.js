import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from 'pages/Landingpage';
import Signin from 'pages/Signin';
import Home from 'pages/Home';
import Menu from 'pages/Menu';
import history from '../history';
import IndexDropdown from 'components/Dropdowns/IndexDropdown';
import CardSettings from 'components/Cards/CardSettings';
import Course from 'pages/Course';

function Root() {
  return (
    <Router history={history}>
      <Routes>
        <Route exact path='/' element={<Signin />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/menu' element={<Menu />} />
        <Route exact path='/course' element={<Course />} />
      </Routes>
    </Router>
  );
}

export default Root;
