import React from 'react';

// it is used on the responses page to display a single response
const SingleResponse = ({response, index}) => {
    var generatedResponse = [];
    for (var question in response) {
        if (response.hasOwnProperty(question)) {
            if (Array.isArray(response[question])) {
                var checkboxAnswers = []
                response[question].forEach(checkboxAnswer => {
                    var answer = <p>{checkboxAnswer}</p>
                    checkboxAnswers.push(answer);
                });

                var toAppend = 
                <div  key={Math.floor((Math.random() * 10000000) + 1)} className="single-response-element">
                    <h3 className="response-question">{question}</h3>
                    <div>
                        {checkboxAnswers}
                    </div>
                </div>
            }else{
                var toAppend = 
                <div  key={Math.floor((Math.random() * 10000000) + 1)} className="single-response-element">
                    <h3 className="response-question">{question}</h3>
                    <p>{response[question]}</p>
                </div>
            }
            generatedResponse.push(toAppend);
        }
    }
  return (
    <div key={index} className="single-response">
        <p className="response-number">{`Response No. ${index+1}`}</p>
        {generatedResponse}
    </div>
  );
}

export default SingleResponse