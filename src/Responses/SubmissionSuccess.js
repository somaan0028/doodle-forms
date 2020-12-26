import React from 'react';
import {NavLink} from 'react-router-dom';

const SubmissionSuccess = () => {
  return (
    <div className="submission-success">
        <h4>Thank You for your Response!</h4>
        <p>Create your own forms at Doodle Forms</p>
        <NavLink to="/signup">Create Form</NavLink>
    </div>
  );
}

export default SubmissionSuccess