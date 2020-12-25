import React, { Component } from 'react';

class TextareaInputDetails extends Component {

  state = {
    question: '',
    maxlength: '',
    action: 'Add'
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
    console.log("Create Element Ran");
    this.props.sendElement(element, e.target.id);
    this.props.closeDetailsPanel(e);
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
              <input type="text" id="question" placeholder="Enter the Question" value={this.state.question} onChange={this.handleQuestion}/>
              <input type="number" id="maxlength" placeholder="Enter Max Limit" value={this.state.maxlength} onChange={this.handleQuestion}/>
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