import React from 'react';

const SingleLine = ({question, id, editElement, deleteElement}) => {
  return (
    <div className="single-line-element form-element" key={id} id={id}>
        <label htmlFor={`question${id+1}`}>{question}</label>
        <input type="text" name={question} id={`question${id+1}`} required/>
        <button onClick={editElement} id={id}>Edit</button>
        <button onClick={deleteElement} id={id}>Delete</button>
    </div>
  );
}

export default SingleLine