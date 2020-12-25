import React from 'react';

const RadioBtn = ({question, values, id, editElement}) => {
  return (
        <div className="radio-btn-element form-element" key={id}>
            <label>{question}</label>
            {
                values.map((value, index) => {
                    return(
                        <div key={index}>
                            <input type="radio" name={question} id={`question${id+1}`} value={value} />
                            <label htmlFor={`question${id+1}`}>{value}</label> 
                        </div>
                    )
                })
            }
            <button onClick={editElement} id={id}>Edit</button>
        </div>
    );
}

export default RadioBtn