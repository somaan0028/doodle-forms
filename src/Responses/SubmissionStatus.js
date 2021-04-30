import React from 'react';
import * as QueryString from "query-string"

const SubmissionStatus = (props) => {

  const params = QueryString.parse(props.location.search);

  // if submission success
  if (params.result == 'true') {
    return (
        <div className="submission-status-container">
            <h4>Thank You for your Response!</h4>
            <p>Create your own forms at Doodle Forms today!</p>
            <button className="submission-status-button" onClick={()=>{props.history.push('/create')}}>Create Form</button>
        </div>
    );

  }else{
    // if submission failed
    return (
      <div className="submission-status-container">
          <h4>Oh no!</h4>
          <p>An Error Occured while submitting your form.</p>
          <button className="submission-status-button" onClick={props.history.goBack} >Back to Form</button>
      </div>
    );
  }
}

export default SubmissionStatus