import React, { Component } from 'react';

class TextareaInputDetails extends Component {

  state = {
    question: '',
    maxlength: '',
    action: 'Add',
    emptyFieldError: ''
  }

  componentDidMount(){
    if (this.props.defaultValues) {
      console.log("Have Default Values");
      console.log(this.props.defaultValues);
      this.setState({
        question: this.props.defaultValues.question,
        maxlength: this.props.defaultValues.maxlength,
        action: 'Done'
      })
    }else{
      console.log("Don't have default values")
    }
  }

  createElement = (e) => {
    e.preventDefault();
    
    var element = {
      type: "Textarea",
      question: this.state.question,
      maxlength: this.state.maxlength,
    }
    if(element.question && !element.question.replace(/\s/g,"") == ""){
      console.log("Create Element Ran");
      this.setState({
        emptyFieldError: ''
      });
      this.props.sendElement(element, e.target.id);
      this.props.closeDetailsPanel(e);
    }else{
      console.log("Empty field");
      this.setState({
        emptyFieldError: 'Please enter a question'
      })
      
    }
  }

  handleQuestion = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  
  render(){
    return (
      <div className="detailsPanel textarea-input-details">
          <form className="detailsForm">
              <h2 className="details-panel-heading">Add a Textarea</h2>
              <input type="text" id="question" placeholder="Enter the Question" value={this.state.question} onChange={this.handleQuestion} autoComplete="off" />
              <input type="number" id="maxlength" placeholder="Enter Max Limit (Optional)" value={this.state.maxlength} onChange={this.handleQuestion} autoComplete="off" />
              <p className="empty-field-error" >{this.state.emptyFieldError}</p>
              <div className="details-panel-btns">
                <button onClick={this.createElement} id={this.props.elementIndex}>{this.state.action}</button>
                <button onClick={this.props.closeDetailsPanel}>Cancel</button>
              </div>
          </form>
      </div>
    );
  }
}

export default TextareaInputDetails