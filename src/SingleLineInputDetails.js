import React, { Component } from 'react';

class SingleLineInputDetails extends Component {

  state = {
    question: null,
  }

  createElement = (e) => {
    e.preventDefault();
    
    var element = {
      type: "Single-line",
      question: this.state.question,
    }
    console.log("Create Element Ran");
    this.props.sendElement(element);
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
              <input type="text" id="question" placeholder="Enter the Question" onChange={this.handleQuestion}/>
              <div className="details-panel-btns">
                <button onClick={this.createElement} >Add</button>
                <button onClick={this.props.closeDetailsPanel}>Cancel</button>
              </div>
          </form>
      </div>
    );
  }
}

export default SingleLineInputDetails