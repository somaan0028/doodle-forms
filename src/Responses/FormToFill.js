import React, { Component } from 'react';
import axios from 'axios';

import SingleLine from '../Form-Elements/SingleLine';
import RadioBtn from '../Form-Elements/RadioBtn';
import Checkboxes from '../Form-Elements/Checkboxes';
import Textarea from '../Form-Elements/Textarea';

import loadingGif from '../loading_gif.gif'

class EditableForm extends Component {

	state = {
		formName: '',
		elements: [],
		generatedElementsList:[],
		displayData: false
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
		var formToGet = window.location.pathname.substr(6);
		if (formToGet.length !== 24) {
			console.log("Form length very short");
			this.props.history.push("/pagenotfound");
		}
		axios({
			method: 'post',
			url: '/getform',
			data: {
				formID: formToGet
			}
		})
		.then((response) => {
			console.log("Response came from /getform POST request");
			console.log(response);
			if (response.data) {
				this.setState({
					formName: response.data.formName,
					elements: response.data.formElements,
					displayData: true
				}, ()=>{this.generateElements()})
				
			}else{
				this.props.history.push("/pagenotfound");
			}
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

	render() {
		if (this.state.displayData) {
			return (
			<div className="theForm form-to-fill">
				<h2 className="formName-formToFill">{this.state.formName}</h2>
				<form method='POST' action='/submitform'>
					{ this.state.generatedElementsList }
					<input type="text" name="formID" value={window.location.pathname.substr(6)} readOnly className="hidden" required/>
					<button className="end-of-form-btn">Submit</button>
				</form>
			</div>
			);
			
		}else{
			return(
				<img className="loading-gif" src={loadingGif} alt="loading..." />
			)
		}
	}
}

export default EditableForm;