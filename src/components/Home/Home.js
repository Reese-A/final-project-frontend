import React from 'react';

import { Link } from 'react-router-dom';
import './Home.css';

import Login from '../../containers/Login/Login';

const Home = (props) => {
  return (
    <div id="homeWrap">
      <div id="homeImage"></div>
      <div id="homeMenu">
        <Login />
        <Link to="/register">Register an account</Link>
      </div>
    </div>
  )
}

export default Home;