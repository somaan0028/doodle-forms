import React from 'react';

const SingleLine = ({question, id, editElement, deleteElement}) => {
  if (editElement) {
    console.log("Editing Buttons should be visible");
    var editButtons = <div className="edit-form-btns-container">
      <button onClick={editElement} id={id} className="edit-form-btns"><i class="fa fa-pencil" aria-hidden="true" id={id} ></i></button>
      <button onClick={deleteElement} id={id} className="edit-form-btns"><i class="fa fa-trash-o" aria-hidden="true" id={id} ></i></button>
    </div>
  }else{
    console.log("Ediing Buttons should NOT be visible");
    var editButtons = null;
  }
  return (
    <div className="single-line-element form-element" key={id} id={id}>
        <label htmlFor={`question${id+1}`} className="form-element-question">{question}</label>
        <input className="oneline-element-input" type="text" name={question} id={`question${id+1}`} autoComplete="off" required/>
        {editButtons}
    </div>
  );
}

export default SingleLine