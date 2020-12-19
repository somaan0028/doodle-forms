import React, { Component } from 'react';

class RadioBtnDetailsPanel extends Component {

  state = {
    numberOfOptionValues: 1,
    optionValues: [null],
    question: null,
    values: []
  }

  componentDidMount(){
    this.setState({
        optionValues: [
            <input type="text" id="option1" key="1" onChange={this.handleOptionValues} placeholder="Enter an Option" />
        ],
        values: [""]
    });
  }

  createElement = (e) => {
    e.preventDefault();
    
    var element = {
      type: "Radio",
      question: this.state.question,
      values: this.state.values
    }
    console.log("Create Element Ran");
    this.props.sendElement(element);
  }

  handleQuestion = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleOptionValues = (e) => {
    console.log(e.target.id);
    var values = [...this.state.values];
    var elementID = e.target.id;
    var index = parseInt(elementID.substr(6)) - 1;
    values[index] = e.target.value;
    // console.log(index);
    this.setState({
        values: values
    })
  }

  addOptionValue = (e) => {
    e.preventDefault();
    var key = this.state.numberOfOptionValues + 1;
    var optionValues = [...this.state.optionValues,
        <input type="text" id={`option${key}`} key={key} onChange={this.handleOptionValues} placeholder="Enter an Option" />
    ]
    this.setState({
        numberOfOptionValues: key,
        optionValues: optionValues,
        values: [...this.state.values, ""]
    });
  }

  removeOptionValue = (e) => {
    e.preventDefault();
    if (this.state.numberOfOptionValues>0) {
        var numberOfOptionValues = this.state.numberOfOptionValues -1;
        var optionValues = [...this.state.optionValues];
        var values = [...this.state.values]

        optionValues.pop();
        values.pop();

        this.setState({
            numberOfOptionValues: numberOfOptionValues,
            optionValues: optionValues,
            values: values
        });
    }
  }

  render(){
    return (
      <div className="detailsPanel radio-btn-input-details">
          <form className="detailsForm">

              <input type="text" id="question" placeholder="Enter the Question" onChange={this.handleQuestion}/>
              {this.state.optionValues}
              <button onClick={this.addOptionValue} >Add Option</button>
              <button onClick={this.removeOptionValue} >Remove Option</button>
              <div className="details-panel-btns">
                <button onClick={this.createElement} >Add</button>
                <button onClick={this.props.closeDetailsPanel}>Cancel</button>
              </div>
          </form>
      </div>
    );
  }
}

export default RadioBtnDetailsPanel