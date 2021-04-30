import React, { Component } from 'react';

// this is displayed when the user wishes to add a 'single line' field in the form
class SingleLineInputDetails extends Component {

  state = {
    question: '',
    action: 'Add',
    emptyFieldError: ''
  }

  componentDidMount(){
    // if default values sent in the props, it means user wishes to update an element
    if (this.props.defaultValues) {

      this.setState({
        question: this.props.defaultValues.question,
        action: 'Done'
      })
    }
  }

  // sends back the newly created form element using the "sendElement" function passed down through props
  createElement = (e) => {
    e.preventDefault();
    
    var element = {
      type: "Single-line",
      question: this.state.question,
    }
    // makes sure that some detail has been entered about the element
    if(element.question && !element.question.replace(/\s/g,"") == ""){
      this.setState({
        emptyFieldError: ''
      });
      this.props.sendElement(element, e.target.id);
      this.props.closeDetailsPanel(e);
    }else{
      this.setState({
        emptyFieldError: 'Please enter a question'
      })
      
    }
  }

  // state updated whenever user types in the 'question' field for the creation of a new element
  handleQuestion = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render(){
    return (
      <div className="detailsPanel single-line-input-details">
          <form className="detailsForm" onSubmit={(e)=>{e.preventDefault()}}>
              <h2 className="details-panel-heading">Add a Single line Field</h2>
              <input type="text" id="question" value={this.state.question} placeholder="Enter the Question" onChange={this.handleQuestion} autoComplete="off" />
              <p className="empty-field-error" >{this.state.emptyFieldError}</p>
              <div className="details-panel-btns">
                <button onClick={this.createElement} id={this.props.elementIndex} >{this.state.action}</button>
                <button onClick={this.props.closeDetailsPanel}>Cancel</button>
              </div>
          </form>
      </div>
    );
  }
}

export default SingleLineInputDetails