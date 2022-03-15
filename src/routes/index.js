import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Switch} from 'react-router-dom';
// import LandingPage from 'pages/Landingpage';
import Signin from 'pages/Signin';
import Home from 'pages/Home';
import Menu from 'pages/Menu';
import history from '../history';
import IndexDropdown from 'components/Dropdowns/IndexDropdown';
import CardSettings from 'components/Cards/CardSettings';
import Course from 'pages/Course';
import { Navigate } from 'react-router';
import PrivateRoute from './PrivateRoute';
import { getLocalUserdata } from '../services/auth/localStorageData';



function Root() {
  const [isSignedIn,setIsSignedIn] = useState(false);
  const data= getLocalUserdata();

  return (
    <Router history={history}>
      <Routes>
        <Route exact path='/' element={<Signin />} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path='/menu' element={<Menu />} />
        <Route exact path='/course' element={<Course />} />
      </Routes>
    </Router>
  );
}

export default Root;
