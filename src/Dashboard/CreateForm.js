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

import Navbar from '../Home/Navbar.js';
import AddFormElements from './AddFormElements';
import { AuthContext } from '../Context/AuthContext';
import loadingGif from '../loading_gif.gif'

// this component is used on the 'create form' page. Allows users to add elements and save the form
class CreateForm extends Component {

	// use context
    static contextType = AuthContext;

	state = {
		formName: "",
		elements: [],
		generatedElementsList:[],
		detailsPanel: null,
		errorToDisplay: '',
		displayData: false
    }

	// generates a list of form elements from the 'elements' value in state. Then stores the new array in state
	generateElements = () => {
		var elements = this.state.elements;
		var generatedElements = [];

		generatedElements = elements.map((element, index)=>{
			var elementType = element.type;

			switch(elementType) {
				case "Single-line":
					return <SingleLine question={element.question} id={index} key={index} editElement={this.editElement} deleteElement={this.deleteElement}/>;

				case "Textarea":
					return <Textarea question={element.question} maxlength={element.maxlength} id={index} key={index} editElement={this.editElement} deleteElement={this.deleteElement}/>;

				case "Radio":
					return <RadioBtn question={element.question} values={element.values} id={index} key={index} editElement={this.editElement} deleteElement={this.deleteElement}/>;

				case "Checkboxes":
					return <Checkboxes question={element.question} values={element.values} id={index} key={index} editElement={this.editElement} deleteElement={this.deleteElement}/>;

				default:
					return null;
			}
		});


		this.setState({
			generatedElementsList: generatedElements
		});
	}
	
	componentDidMount(){
		// checking whether user logged in. Only sets 'displayData' to 'true' when logged in.
		const { checkAuthAndReturnData } = this.context;
        checkAuthAndReturnData().then(()=>{
			this.setState({
				displayData: true
			})
		});
	}

	// adds new elements and stores in the state
	addElement = (element) => {
		var updatedElementsList = [...this.state.elements, element]
		this.setState({
			elements: updatedElementsList,
			errorToDisplay: ''
		}, ()=>{
			this.generateElements();

		});
		
	}

	// updates a particular element in the 'elements' array in state
	updateElement = (element, index) => {
		var updatedElementsList = [...this.state.elements];
		updatedElementsList[index] = element;
		this.setState({
			elements: updatedElementsList
		}, ()=>{
			this.generateElements();
		});
	}

	// to save the newly created form
	saveForm = () => {

		// only saves if the form name is not empty and there is atleast one element added
		if (this.state.formName && !this.state.formName.replace(/\s/g,"") == "" && this.state.elements.length !== 0) {
			this.setState({
				errorToDisplay: ''
			});
			axios({
				method: 'post',
				url: '/saveform',
				data: {
					formName: this.state.formName,
					formElements: this.state.elements,
					time: Math.floor((new Date()).getTime() / 1000),
					numOfResponses: 0 
				}
			})
			.then((response) => {
				var redirectTo = "/edit/" + response.data.formID;
				this.props.history.push( redirectTo );
			})
			.catch((response) => {
				console.log("could not send data to /saveform");
			})
			
		}else if(this.state.elements.length == 0){
			// if no element added
			this.setState({
				errorToDisplay: <p className="error-msg">Please add at least one form Element</p>
			})
		}else{
			// if no form name entered
			this.setState({
				errorToDisplay: <p className="error-msg">Please Enter a Name for the Form</p>
			})
		}
	}

	// shows the details panel again to edit the element
	editElement = (e) =>{
		// will show the elements previous details in the details panel which the user can then edit
		var elementToEdit = this.state.elements[e.target.id];
		var theDetailsPanel;

		// showing the appropriate details element
		switch(elementToEdit.type) {
			case "Single-line":
				theDetailsPanel = <SingleLineInputDetails closeDetailsPanel={this.closeDetailsPanel} sendElement={(element, index)=>{this.updateElement(element, index)}} defaultValues={elementToEdit} elementIndex={e.target.id}/>;
				break;
			
			case "Textarea":
				theDetailsPanel = <TextareaInputDetails closeDetailsPanel={this.closeDetailsPanel} sendElement={(element, index)=>{this.updateElement(element, index)}} defaultValues={elementToEdit} elementIndex={e.target.id}/>;
				break;

			case "Radio":
				theDetailsPanel = <RadioBtnDetailsPanel closeDetailsPanel={this.closeDetailsPanel} sendElement={(element, index)=>{this.updateElement(element, index)}} defaultValues={elementToEdit} elementIndex={e.target.id}/>;
				break;

			case "Checkboxes":
				theDetailsPanel = <CheckboxesDetailsPanel closeDetailsPanel={this.closeDetailsPanel} sendElement={(element, index)=>{this.updateElement(element, index)}} defaultValues={elementToEdit} elementIndex={e.target.id}/>;
				break;

			default:
				return null;
		}
		this.setState({
			detailsPanel: theDetailsPanel
		})
	}

	// hides the details panel in which the user types the details of the element that is to be added
	closeDetailsPanel = (e) => {
		e.preventDefault();
		this.setState({
			detailsPanel: null
		})
	}

	// delets an element from the form by removing it from the 'elements' array in state
	deleteElement = (e) => {
		var elementsToUpdate = this.state.elements;

		elementsToUpdate.splice(e.target.id, 1);
		this.setState({
			elements: elementsToUpdate
		}, ()=>{
			this.generateElements();
		});
	}

	render() {
		if(this.state.displayData){
			return (
			<div className="theForm create-form">
			    <Navbar isAuth={true} />
				<h2 className="create-form-heading">Create Form</h2>
				<div className="form-name-container">
					<label>Name of Form: </label>
					<input className="formName-input" onChange={(e)=>{this.setState({formName: e.target.value})}} type="text" name="form-name" placeholder="Name of Form" autoComplete="off" />
				</div>
				{ this.state.generatedElementsList }
				{ this.state.detailsPanel }
				<AddFormElements addElement={(element)=> this.addElement(element)}/>				
				{ this.state.errorToDisplay }
				<button onClick={this.saveForm} className="end-of-form-btn">Create</button>
			</div>
			);
		}else{
			return (
				<img className="loading-gif" src={loadingGif} alt="loading..." />
			)
		}
	}
}

export default CreateForm;