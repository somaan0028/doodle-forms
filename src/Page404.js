import React from 'react';
import {NavLink} from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="page-404">
        <h2>Oops!</h2>
        <b>404 Error</b>
        <p>Sign Up today to start creating your Forms!</p>
        <NavLink className="btn-404" to="/create">Create Form</NavLink>
    </div>
  );
}

export default Page404