import React from 'react';

const Textarea = ({question, maxlength, id, editElement, deleteElement}) => {
  if (editElement) {
    console.log("Editing Buttons should be visible");
    var editButtons = <div>
      <button onClick={editElement} id={id}>Edit</button>
      <button onClick={deleteElement} id={id}>Delete</button>
    </div>
  }else{
    console.log("Ediing Buttons should NOT be visible");
    var editButtons = null;
  }
  return (
    <div className="text-area-element form-element" key={id}>
        <label htmlFor={`question${id+1}`}>{question}</label>
        <textarea name={question} id={`question${id+1}`} rows="10" cols="30" maxLength={maxlength} required></textarea>
        {editButtons}
    </div>
  );
}

export default Textarea