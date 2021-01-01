import React, { Component } from 'react';

class SingleLineInputDetails extends Component {

  state = {
    question: '',
    action: 'Add',
    emptyFieldError: ''
  }
  componentDidMount(){
    if (this.props.defaultValues) {
      console.log("Have Default Values");
      console.log(this.props.defaultValues);
      this.setState({
        question: this.props.defaultValues.question,
        action: 'Done'
      })
    }else{
      console.log("Don't have default values")
    }
  }
  createElement = (e) => {
    e.preventDefault();
    
    var element = {
      type: "Single-line",
      question: this.state.question,
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
      <div className="detailsPanel single-line-input-details">
          <form className="detailsForm" onSubmit={(e)=>{e.preventDefault()}}>
              <h2 className="details-panel-heading">Add a Single line Field</h2>
              <input type="text" id="question" value={this.state.question} placeholder="Enter the Question" onChange={this.handleQuestion} autoComplete="off" />
              <p className="empty-field-error" >{this.state.emptyFieldError}</p>
              <div className="details-panel-btns">
                <button onClick={this.createElement} id={this.props.elementIndex} >{this.state.action}</button>
                {/* <input onSubmit={this.createElement} type="submit" value="Adddd" /> */}
                <button onClick={this.props.closeDetailsPanel}>Cancel</button>
              </div>
          </form>
      </div>
    );
  }
}

export default SingleLineInputDetails