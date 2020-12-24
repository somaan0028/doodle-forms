import React from 'react';

const SingleLine = ({question, id}) => {
  return (
    <div className="single-line-element form-element" key={id}>
        <label htmlFor={`question${id+1}`}>{question}</label>
        <input type="text" name={question} id={`question${id+1}`} />
    </div>
  );
}

export default SingleLine