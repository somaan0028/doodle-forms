import React, { Component } from 'react';

class TextareaInputDetails extends Component {

  state = {
    question: null,
    maxLimit: null
  }

  createElement = (e) => {
    e.preventDefault();
    
    var element = {
      type: "Textarea",
      question: this.state.question,
    }
    console.log("Create Element Ran");
    this.props.sendElement(element);
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
              <input type="text" id="question" placeholder="Enter the Question" onChange={this.handleQuestion}/>
              <input type="number" id="maxLimit" placeholder="Enter Max Limit" onChange={this.handleQuestion}/>
              <div className="details-panel-btns">
                <button onClick={this.createElement} >Add</button>
                <button onClick={this.props.closeDetailsPanel}>Cancel</button>
              </div>
          </form>
      </div>
    );
  }
}

export default TextareaInputDetails