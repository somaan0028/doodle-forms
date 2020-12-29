import React, { Component } from 'react';
import axios from 'axios';

import SingleLine from '../Form-Elements/SingleLine';
import RadioBtn from '../Form-Elements/RadioBtn';
import Checkboxes from '../Form-Elements/Checkboxes';
import Textarea from '../Form-Elements/Textarea';

import SingleLineInputDetails from '../Detail-Panels/SingleLineInputDetails';
import TextareaInputDetails from '../Detail-Panels/TextareaInputDetails';
import RadioBtnDetailsPanel from '../Detail-Panels/RadioBtnDetailsPanel';
import CheckboxesDetailsPanel from '../Detail-Panels/CheckboxesDetailsPanel';

import AddFormElements from './AddFormElements';
import { AuthContext } from '../Context/AuthContext';
import loadingGif from '../loading_gif.gif'

class EditableForm extends Component {

	static contextType = AuthContext;

	state = {
		formName: "",
		elements: [],
		generatedElementsList:[],
		detailsPanel: null,
		emptyFormNameError: '',
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
					return <SingleLine question={element.question} id={index} key={index} editElement={this.editElement} deleteElement={this.deleteElement}/>;

				case "Textarea":
					console.log("Its a single line element");
					return <Textarea question={element.question} maxlength={element.maxlength} id={index} key={index} editElement={this.editElement} deleteElement={this.deleteElement}/>;

				case "Radio":
					console.log("Its a Radio element");
					return <RadioBtn question={element.question} values={element.values} id={index} key={index} editElement={this.editElement} deleteElement={this.deleteElement}/>;

				case "Checkboxes":
					console.log("Its a Checkbox element");
					return <Checkboxes question={element.question} values={element.values} id={index} key={index} editElement={this.editElement} deleteElement={this.deleteElement}/>;

				default:
					console.log("No element");
					return null;
			}
		});


		this.setState({
			generatedElementsList: generatedElements
		});
		// console.log(generatedElements);
	}
	
	componentDidMount(){

		const { checkAuthAndReturnData } = this.context;
		checkAuthAndReturnData('SingleForm', window.location.pathname.substr(6))
		.then((result)=>{
			console.log(result);
			this.setState({
				formName: result.formName,
				elements: result.formElements,
				displayData: true
			}, ()=>{this.generateElements()})
		})
		.catch((response) => {
			console.log("could not get form from /getform")
		})
	}

	addElement = (element) => {
		var updatedElementsList = [...this.state.elements, element]
		this.setState({
			elements: updatedElementsList
		}, ()=>{
			this.generateElements();
			console.log(this.state.elements);
			console.log("Element should be added");
		});
		
	}
	
	updateElement = (element, index) => {
		var updatedElementsList = [...this.state.elements];
		updatedElementsList[index] = element;
		this.setState({
			elements: updatedElementsList
		}, ()=>{
			this.generateElements();
			// console.log(this.state.elements);
			console.log("Element should be updated");
		});
		
	}

	updateForm = () => {
		if (this.state.formName && !this.state.formName.replace(/\s/g,"") == "") {
			this.setState({
				emptyFormNameError: ''
			})			
			axios({
				method: 'post',
				url: '/updateform',
				data: {
					formID: window.location.pathname.substr(6),
					formElements: this.state.elements,
					formName: this.state.formName
				}
			})
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (response) {
				console.log("could not send date")
			})
		}else{
			console.log("Name field is empty")
			this.setState({
				emptyFormNameError: 'Please Enter a Name for the Form'
			})
		}
	}
	
	editElement = (e) =>{
		var elementToEdit = this.state.elements[e.target.id];
		var theDetailsPanel;
		console.log(elementToEdit);
		switch(elementToEdit.type) {
			case "Single-line":
				console.log("About to edit a single line element");
				theDetailsPanel = <SingleLineInputDetails closeDetailsPanel={this.closeDetailsPanel} sendElement={(element, index)=>{this.updateElement(element, index)}} defaultValues={elementToEdit} elementIndex={e.target.id}/>;
				break;
			
			case "Textarea":
				console.log("Its textarea-input-btn");
				theDetailsPanel = <TextareaInputDetails closeDetailsPanel={this.closeDetailsPanel} sendElement={(element, index)=>{this.updateElement(element, index)}} defaultValues={elementToEdit} elementIndex={e.target.id}/>;
				break;

			case "Radio":
				console.log("Its radio-input-btn");
				theDetailsPanel = <RadioBtnDetailsPanel closeDetailsPanel={this.closeDetailsPanel} sendElement={(element, index)=>{this.updateElement(element, index)}} defaultValues={elementToEdit} elementIndex={e.target.id}/>;
				break;

			case "Checkboxes":
				console.log("Its checkbox-input-btn");
				theDetailsPanel = <CheckboxesDetailsPanel closeDetailsPanel={this.closeDetailsPanel} sendElement={(element, index)=>{this.updateElement(element, index)}} defaultValues={elementToEdit} elementIndex={e.target.id}/>;
				break;

			default:
				console.log("No element");
				return null;
		}
		this.setState({
			detailsPanel: theDetailsPanel
		})
	}

	closeDetailsPanel = (e) => {
		e.preventDefault();
		this.setState({
			detailsPanel: null
		})
	}

	deleteElement = (e) => {
		var elementsToUpdate = this.state.elements;
		console.log("delete index: " + e.target.id)
		console.log(elementsToUpdate);
		elementsToUpdate.splice(e.target.id, 1);
		console.log(elementsToUpdate);
		this.setState({
			elements: elementsToUpdate
		}, ()=>{
			this.generateElements();
		});
	}

	render() {
		if (this.state.displayData) {
			return (
			<div className="editable-form">
				<AddFormElements addElement={(element)=> this.addElement(element)}/>
				<label>Name of Form</label>
				<input value={this.state.formName} onChange={(e)=>{e.preventDefault(); this.setState({formName: e.target.value})}} type="text" name="formName" autoComplete="off" />
				{ this.state.generatedElementsList }
				{ this.state.detailsPanel }
				{ this.state.emptyFormNameError }
				<button onClick={this.updateForm}>Update</button>
			</div>
			);
		}else{
			return(
				<img src={loadingGif} alt="loading..." />
			)
		}
	}
}

export default EditableForm;