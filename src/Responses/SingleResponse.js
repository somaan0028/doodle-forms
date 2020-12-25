import React from 'react';

const SingleResponse = ({response, index}) => {
    console.log(response);
    var generatedResponse = [];
    for (var question in response) {
        if (response.hasOwnProperty(question)) {
            console.log(question + " -> " + response[question]);
            var toAppend = <p>{`${question}: ${response[question]}`}</p>
            generatedResponse.push(toAppend);
        }
    }
  return (
    <div className="single-response" key={index}>
        {generatedResponse}
    </div>
  );
}

export default SingleResponse