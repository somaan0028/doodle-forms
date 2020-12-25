import React from 'react';

const Checkboxes = ({question, values, id, editElement}) => {
  return (
        <div className="checkboxes-element form-element" key={id}>
            <label>{question}</label>
            {
                values.map((value, index) => {
                    return(
                        <div key={index}>
                            <input type="checkbox" name={question} id={`question${id+1}`} value={value} />
                            <label htmlFor={`question${id+1}`}>{value}</label>
                        </div>
                    )
                })
            }
            <button onClick={editElement} id={id}>Edit</button>
        </div>
    );
}

export default Checkboxes