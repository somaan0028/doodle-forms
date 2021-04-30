import React, { Component } from 'react';

// this is displayed when the user wishes to add a checkbox into the form
class CheckboxesDetailsPanel extends Component {

  state = {
    numberOfOptionValues: 1,
    optionValues: [],
    question: '',
    values: [""],
    action: 'Add',
    emptyFieldError: ''
  }

  componentDidMount(){
    // if default values sent in the props, it means user wishes to update an element
    if (this.props.defaultValues) {
      this.setState({
        question: this.props.defaultValues.question,
        values: this.props.defaultValues.values,
        numberOfOptionValues: this.props.defaultValues.values.length,
        action: 'Done'
      }, ()=>{
        this.generateElements();
      });

    }else{
      this.setState({
        optionValues: [
            <input type="text" id="option1" key="1" value={this.state.values[0]} onChange={this.handleOptionValues} placeholder="Enter an Option" autoComplete="off" />
        ],
        values: [""]
      });
    }

  }

  // creates a list of the options added in the checkbox element
  generateElements = () => {

    var optionValues;

    optionValues = this.state.values.map((value, index)=>{
      var key = index+1;
      return <input type="text" id={`option${key}`} key={key} value={this.state.values[index]} onChange={this.handleOptionValues} placeholder="Enter an Option" autoComplete="off" />
    });
    this.setState({
      optionValues: optionValues
    });
  }

  // sends back the newly created form element using the "sendElement" function passed down through props
  createElement = (e) => {
    e.preventDefault();
    
    var element = {
      type: "Checkboxes",
      question: this.state.question,
      values: this.state.values
    }
    var valueIsEmpty = element.values.includes("");

    if(element.question === '' || valueIsEmpty){
      this.setState({
        emptyFieldError: 'Please fill all the fields'
      })
    }else{
      this.setState({
        emptyFieldError: ''
      });
      this.props.sendElement(element, e.target.id);
      this.props.closeDetailsPanel(e);
    }
  }

  // state updated whenever user types in the 'question' field for the creation of a new element
  handleQuestion = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleOptionValues = (e) => {
    var values = [...this.state.values];
    var elementID = e.target.id;
    var index = parseInt(elementID.substr(6)) - 1;
    values[index] = e.target.value;
    this.setState({
        values: values
    }, ()=>{
      this.generateElements();
    })
  }


  addOptionValue = (e) => {
    e.preventDefault();
    var key = this.state.numberOfOptionValues + 1;
    this.setState({
        numberOfOptionValues: key,
        values: [...this.state.values, ""]
    }, ()=>{
      var optionValues = [...this.state.optionValues,
          <input type="text" id={`option${key}`} key={key} value={this.state.values[key-1]} onChange={this.handleOptionValues} placeholder="Enter an Option" autoComplete="off" />
      ]
      this.setState({
        optionValues: optionValues,
      })
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
      <div className="detailsPanel checkbox-input-details">
          <form className="detailsForm">
              <h2 className="details-panel-heading">Add Checkboxes</h2>
              <input type="text" id="question" value={this.state.question} placeholder="Enter the Question" onChange={this.handleQuestion} autoComplete="off" />
              {this.state.optionValues}
              <div className="add-remove-options-div">
                <button onClick={this.addOptionValue} ><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button onClick={this.removeOptionValue} ><i className="fa fa-minus" aria-hidden="true"></i></button>
              </div>
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

export default CheckboxesDetailsPanel