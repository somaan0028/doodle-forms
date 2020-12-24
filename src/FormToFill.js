import React, { Component } from 'react';
import axios from 'axios';

import SingleLine from './SingleLine';
import RadioBtn from './RadioBtn';
import Checkboxes from './Checkboxes';
import Textarea from './Textarea';
import AddFormElements from './AddFormElements';

class EditableForm extends Component {

	state = {
		elements: [],
		generatedElementsList:[]
	}

	generateElements = () => {
		var elements = this.state.elements;
		var generatedElements = [];

		generatedElements = elements.map((element, index)=>{
			var elementType = element.type;
			// var generatedElement;
			switch(elementType) {
				case "Single-line":
					console.log("Its a single line element");
					return <SingleLine question={element.question} id={index} key={index} />;

				case "Textarea":
					console.log("Its a single line element");
					return <Textarea question={element.question} maxlength={element.maxlength} id={index} key={index} />;

				case "Radio":
					console.log("Its a Radio element");
					return <RadioBtn question={element.question} values={element.values} id={index} key={index} />;

				case "Checkboxes":
					console.log("Its a Checkbox element");
					return <Checkboxes question={element.question} values={element.values} id={index} key={index} />;

				default:
					console.log("No element");
					return null;
			}
		});


		this.setState({
			generatedElementsList: generatedElements
		});
	}
	
	componentDidMount(){
		axios({
			method: 'post',
			url: '/getform',
			data: {
				formID:  window.location.pathname.substr(6)
			}
		})
		.then((response) => {
			console.log(response.data);
			this.setState({
				elements: response.data.formElements
			}, ()=>{this.generateElements()})
		})
		.catch((response) => {
			console.log("could not get form from /getform")
		})
	}
	
	submitForm = () => {

        axios({
			method: 'post',
			url: '/submitform',
			// data: {
			// 	response: ,
			// }
		})
		.then((response) => {
			console.log("Form Submitted");
		})
		.catch((response) => {
			console.log("could not submit form");
		})
	}

    // collectResponse

	render() {
		return (
		<div className="editable-form">
            <form method='POST' action='/submitform'>
                {/* <AddFormElements addElement={(element)=> this.addElement(element)}/> */}
                {/* <button onClick={this.generateElements} >Generate Elements</button> */}
                { this.state.generatedElementsList }
                <input type="text" name="formID" value={window.location.pathname.substr(6)} className="hidden" required/>
                <button>Submit</button>
                {/* <button onClick={this.hitBackend}>Test</button> */}
            </form>
		</div>
		);
	}
}

export default EditableForm;