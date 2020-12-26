import React, { Component } from 'react';

class SingleLineInputDetails extends Component {

  state = {
    question: '',
    action: 'Add'
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
      <div className="detailsPanel single-line-input-details">
          <form className="detailsForm" onSubmit={(e)=>{e.preventDefault()}}>
              <input type="text" id="question" value={this.state.question} placeholder="Enter the Question" onChange={this.handleQuestion}  />
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