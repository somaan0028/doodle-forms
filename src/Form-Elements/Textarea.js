import React, { Component } from 'react';
class Textarea extends Component {

  state = { 
    charsTyped: 0
  }

  componentDidMount(){
    var textareaId = `#question${this.props.id+1}`;
    var textareaValueLength = document.querySelector(textareaId).value.length;
    this.setState({
      charsTyped: textareaValueLength
    })
  }

  handleTyping = (e)=>{
    var charsTyped = e.target.value.length;
    this.setState({
      charsTyped: charsTyped
    })
  }

  render() { 
    const {question, maxlength, id, editElement, deleteElement} = this.props;
    if (editElement) {
      console.log("Editing Buttons should be visible");
      var editButtons = <div className="edit-form-btns-container">
        <button onClick={editElement} id={id} className="edit-form-btns"><i class="fa fa-pencil" aria-hidden="true" id={id} ></i></button>
        <button onClick={deleteElement} id={id} className="edit-form-btns"><i class="fa fa-trash-o" aria-hidden="true" id={id} ></i></button>
      </div>
    }else{
      console.log("Editing Buttons should NOT be visible");
      var editButtons = null;
    }

    if (this.props.maxlength && this.props.maxlength>=0) {
      var charLimitDisplay = <p className="char-limit-textarea">{this.state.charsTyped}/{this.props.maxlength}</p>
    }else{
      var charLimitDisplay = null;
    }
    return (
      <div className="text-area-element form-element" key={id}>
          <label htmlFor={`question${id+1}`} className="form-element-question">{question}</label>
          <textarea onChange={this.handleTyping} className="textarea-element-input" name={question} id={`question${id+1}`} rows="10" cols="30" maxLength={maxlength} required></textarea>
          {editButtons}
          {charLimitDisplay}
      </div>
    );
  }
}
 
export default Textarea;