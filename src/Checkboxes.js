import React from 'react';

const Checkboxes = ({question, values, id}) => {
  return (
        <div className="checkboxes-element form-element" key={id}>
            <label>{question}</label>
            {
                values.map(value => {
                    return(
                        <div key={value}>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value={value} />
                            <label htmlFor={value}>{value}</label>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Checkboxes