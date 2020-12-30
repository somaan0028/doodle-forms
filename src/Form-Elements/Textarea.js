import React from 'react';

const Textarea = ({question, maxlength, id, editElement, deleteElement}) => {
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
    <div className="text-area-element form-element" key={id}>
        <label htmlFor={`question${id+1}`} className="form-element-question">{question}</label>
        <textarea className="textarea-element-input" name={question} id={`question${id+1}`} rows="10" cols="30" maxLength={maxlength} required></textarea>
        {editButtons}
    </div>
  );
}

export default Textarea