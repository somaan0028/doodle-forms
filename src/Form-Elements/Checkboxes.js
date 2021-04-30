import React from 'react';

// when a form is displayed, the checkboxes in it are displayed using this component
const Checkboxes = ({question, values, id, editElement, deleteElement}) => {

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
        <div className="checkboxes-element form-element" key={id}>
            <label className="form-element-question">{question}</label>
            {
                values.map((value, index) => {
                    return(
                        <div key={index}>
                            <input className="checkbox-element-input" type="checkbox" name={question} id={`question${id+1}`} value={value} />
                            <label htmlFor={`question${id+1}`}>{value}</label>
                        </div>
                    )
                })
            }
            {editButtons}
        </div>
    );
}

export default Checkboxes