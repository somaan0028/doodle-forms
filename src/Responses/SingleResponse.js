import React from 'react';

const SingleResponse = ({response, index}) => {
    console.log(response);
    var generatedResponse = [];
    for (var question in response) {
        if (response.hasOwnProperty(question)) {
            console.log(question + " -> " + response[question]);
            if (Array.isArray(response[question])) {
                var checkboxAnswers = []
                response[question].forEach(checkboxAnswer => {
                    var answer = <p>{checkboxAnswer}</p>
                    checkboxAnswers.push(answer);
                });

                // </div>
                var toAppend = 
                <div className="single-response-element">
                    <h3 className="response-question">{question}</h3>
                    <div>
                        {checkboxAnswers}
                    </div>
                </div>
            }else{
                var toAppend = 
                <div className="single-response-element">
                    <h3 className="response-question">{question}</h3>
                    <p>{response[question]}</p>
                </div>
            }
            generatedResponse.push(toAppend);
        }
    }
  return (
    <div className="single-response" key={index}>
        <p className="response-number">{`Response No. ${index+1}`}</p>
        {generatedResponse}
    </div>
  );
}

export default SingleResponse