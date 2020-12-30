import React from 'react';

const SingleLine = ({question, id, editElement, deleteElement}) => {
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
    <div className="single-line-element form-element" key={id} id={id}>
        <label htmlFor={`question${id+1}`}>{question}</label>
        <input type="text" name={question} id={`question${id+1}`} autoComplete="off" required/>
        {editButtons}
    </div>
  );
}

export default SingleLine