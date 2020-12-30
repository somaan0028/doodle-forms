import React from 'react';

const RadioBtn = ({question, values, id, editElement, deleteElement}) => {

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
        <div className="radio-btn-element form-element" key={id}>
            <label>{question}</label>
            {
                values.map((value, index) => {
                    return(
                        <div key={index}>
                            <input type="radio" name={question} id={`question${id+1}`} value={value} required/>
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