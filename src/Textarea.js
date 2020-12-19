import React from 'react';

const Textarea = ({question, maxlength, id}) => {
  return (
    <div className="text-area-element form-element" key={id}>
        <label>{question}</label>
        <textarea name={`question${id+1}`} rows="10" cols="30" maxLength={maxlength}></textarea>
    </div>
  );
}

export default Textarea