import React from 'react';

// when a form is displayed, the radio btns in it are displayed using this component
const RadioBtn = ({question, values, id, editElement, deleteElement}) => {

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
        <div className="radio-btn-element form-element" key={id}>
            <label className="form-element-question">{question}</label>
            {
                values.map((value, index) => {
                    return(
                        <div key={index}>
                            <input className="radio-element-input" type="radio" name={question} id={`question${id+1}`} value={value} required/>
                            <label htmlFor={`question${id+1}`}>{value}</label> 
                        </div>
                    )
                })
            }
            {editButtons}
        </div>
    );
}

export default RadioBtn