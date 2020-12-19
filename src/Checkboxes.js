import React from 'react';

const Checkboxes = ({question, values, id}) => {
  return (
        <div className="checkboxes-element form-element" key={id}>
            <label>{question}</label>
            {
                values.map((value, index) => {
                    return(
                        <div key={index}>
                            <input type="checkbox" id="vehicle1" name={`question${id+1}`} value={value} />
                            <label htmlFor={value}>{value}</label>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Checkboxes