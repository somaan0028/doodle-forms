import React from 'react';

const SingleLine = ({question, id}) => {
  return (
    <div className="single-line-element form-element" key={id}>
        <label>{question}</label>
        <input type="text" name={`question${id+1}`} required/>
    </div>
  );
}

export default SingleLine