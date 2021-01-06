import React from 'react';
import {NavLink} from 'react-router-dom';
import * as QueryString from "query-string"

const SubmissionStatus = (props) => {

  console.log("Query Parameters: ");
  const params = QueryString.parse(props.location.search);
  console.log(params.result);
  console.log(props.history);

  // sendToSignUp = ()=>{
  //   props.history.push('/signup')
  // }
  if (params.result == 'true') {
    return (
        <div className="submission-status-container">
            <h4>Thank You for your Response!</h4>
            <p>Create your own forms at Doodle Forms today!</p>
            {/* <NavLink to="/signup">Create Form</NavLink> */}
            <button className="submission-status-button" onClick={()=>{props.history.push('/create')}}>Create Form</button>
        </div>
    );

  }else{
    return (
      <div className="submission-status-container">
          <h4>Oh no!</h4>
          <p>An Error Occured while submitting your form.</p>
          {/* <NavLink to="/signup">Back to Form</NavLink> */}
          <button className="submission-status-button" onClick={props.history.goBack} >Back to Form</button>
      </div>
    );
  }
}

export default SubmissionStatus