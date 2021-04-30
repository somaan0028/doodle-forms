import React from 'react';

// when a form is displayed, the single line field in it is displayed using this component
const SingleLine = ({question, id, editElement, deleteElement}) => {

  // shows btns for editing and deleting element. Only visible when user editing or creating the form. Depends on the props(editElement)
  if (editElement) {
    var editButtons = <div className="edit-form-btns-container">
      <button onClick={editElement} id={id} className="edit-form-btns"><i className="fa fa-pencil" aria-hidden="true" id={id} ></i></button>
      <button onClick={deleteElement} id={id} className="edit-form-btns"><i className="fa fa-trash-o" aria-hidden="true" id={id} ></i></button>
    </div>
  }else{
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