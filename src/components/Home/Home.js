import React from 'react';
import './Home.css';

import Login from '../../containers/Login/Login';

const Home = (props) => {
  return (
    <div id="homeWrap">
      <div id="homeImage"></div>
      <div id="homeMenu">
        <Login />
        <div>register page link</div>
      </div>
    </div>
  )
}

export default Home;