import React from 'react';

const RadioBtn = ({question, values, id}) => {
  return (
        <div className="radio-btn-element form-element" key={id}>
            <label>{question}</label>
            {
                values.map((value, index) => {
                    return(
                        <div key={index}>
                            <input type="radio" id="male" name="gender" value={value} />
                            <label htmlFor={value}>{value}</label> 
                        </div>
                    )
                })
            }
        </div>
    );
}

export default RadioBtn