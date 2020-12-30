import React from 'react';

const Checkboxes = ({question, values, id, editElement, deleteElement}) => {

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