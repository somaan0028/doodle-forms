import React from 'react';
import {NavLink} from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="page-404">
        <h2>Oops! 404 Error.</h2>
        <p>Sign Up today to start creating your Forms!</p>
        <NavLink to="/signup">Create Form</NavLink>
    </div>
  );
}

export default Page404