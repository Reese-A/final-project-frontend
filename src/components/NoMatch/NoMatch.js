import React from 'react';
import { Link } from 'react-router-dom';

import './NoMatch.css';

const NoMatch = (props) => {
  return (
    <div>
      <h1>Page Not Found!</h1>
      <h3>The page you're looking for does not exist. Please navigate back to the <Link to="/">homepage</Link></h3>
    </div>
  )
}

export default NoMatch;