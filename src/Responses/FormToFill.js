import React, { Component } from 'react';
import axios from 'axios';

import SingleLine from '../Form-Elements/SingleLine';
import RadioBtn from '../Form-Elements/RadioBtn';
import Checkboxes from '../Form-Elements/Checkboxes';
import Textarea from '../Form-Elements/Textarea';

import loadingGif from '../loading_gif.gif'

// this componenet is displayed when any normal person (not an account owner) fills a already created form. 
class EditableForm extends Component {

	state = {
		formName: '',
		elements: [],
		generatedElementsList:[],
		displayData: false
	}

	// generates the list of form elements and stores in state
	generateElements = () => {
		var elements = this.state.elements;
		var generatedElements = [];

		generatedElements = elements.map((element, index)=>{
			var elementType = element.type;
			switch(elementType) {
				case "Single-line":
					return <SingleLine question={element.question} id={index} key={index} />;

				case "Textarea":
					return <Textarea question={element.question} maxlength={element.maxlength} id={index} key={index} />;

				case "Radio":
					return <RadioBtn question={element.question} values={element.values} id={index} key={index} />;

				case "Checkboxes":
					return <Checkboxes question={element.question} values={element.values} id={index} key={index} />;

				default:
					return null;
			}
		});


		this.setState({
			generatedElementsList: generatedElements
		});
	}
	
	componentDidMount(){
		var formToGet = window.location.pathname.substr(6);

		// if invalid form id (less then 24 chars)
		if (formToGet.length !== 24) {
			this.props.history.push("/pagenotfound");
		}

		// gets the form
		axios({
			method: 'post',
			url: '/getform',
			data: {
				formID: formToGet
			}
		})
		.then((response) => {

			if (response.data) {
				this.setState({
					formName: response.data.formName,
					elements: response.data.formElements,
					displayData: true
				}, ()=>{this.generateElements()})
				
			}else{
				// shows 404 error if no form of that id found
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
		})
		.then((response) => {
			console.log("Form Submitted");
		})
		.catch((response) => {
			console.log("Could not submit form");
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