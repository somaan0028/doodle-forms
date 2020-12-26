import React from 'react';

const Textarea = ({question, maxlength, id, editElement, deleteElement}) => {
  return (
    <div className="text-area-element form-element" key={id}>
        <label htmlFor={`question${id+1}`}>{question}</label>
        <textarea name={question} id={`question${id+1}`} rows="10" cols="30" maxLength={maxlength}></textarea>
        <button onClick={editElement} id={id}>Edit</button>
        <button onClick={deleteElement} id={id}>Delete</button>
    </div>
  );
}

export default Textarea