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

// this component is used when user wants to edit the form after it has already created it.
// most of the methods are the same as in the CreateForm component so refer to it.
class EditableForm extends Component {

	static contextType = AuthContext;

	state = {
		formName: "",
		elements: [],
		generatedElementsList:[],
		detailsPanel: null,
		errorToDisplay: '',
		time: '',
		displayData: false,
		flashMsg: ''
	}

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
	
	convertUnix = (unixTime) =>{
        // Unixtimestamp
        var unixtimestamp = unixTime;

        // Months array
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        // Convert timestamp to milliseconds
        var date = new Date(unixtimestamp*1000);

        // Year
        var year = date.getFullYear();

        // Month
        var month = months_arr[date.getMonth()];

        // Day
        var day = date.getDate();

        // Hours
        var hours = date.getHours();

        // Minutes
        var minutes = "0" + date.getMinutes();

        // Seconds
        var seconds = "0" + date.getSeconds();

        // Display date time in MM-dd-yyyy h:m:s format
        // var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2);
        
        // return convdataTime;
        return convdataTime
        
	}
	
	componentDidMount(){

		const { checkAuthAndReturnData } = this.context;

		// if form id has wrong format
		if (window.location.pathname.substr(6).length !== 24) {
			this.props.history.push("/pagenotfound");
		}
		
		// checks auth and returns the single form requested for
		checkAuthAndReturnData('SingleForm', window.location.pathname.substr(6))
		.then((result)=>{

			var convertedTime = this.convertUnix(result.time);
			this.setState({
				formName: result.formName,
				elements: result.formElements,
				time: convertedTime,
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
			elements: updatedElementsList,
			errorToDisplay: ''
		}, ()=>{
			this.generateElements();
		});
		
	}
	
	updateElement = (element, index) => {
		var updatedElementsList = [...this.state.elements];
		updatedElementsList[index] = element;
		this.setState({
			elements: updatedElementsList
		}, ()=>{
			this.generateElements();

		});
		
	}

	// this method sends a request to the server to overwrite the old form and save the updated form
	updateForm = () => {
		if (this.state.formName && !this.state.formName.replace(/\s/g,"") == "" && this.state.elements.length !== 0) {
			this.setState({
				errorToDisplay: ''
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
			.then( (response)=> {
				if(response.data){
					this.setState({
						flashMsg: <p className="dashboard-flash-msg">Form Updated</p>
					}, this.hideFlashMsg)
				}else{
					this.setState({
						flashMsg: <p className="dashboard-flash-msg">Could NOT Update Form!</p>
					}, this.hideFlashMsg)
				}
			})
			.catch( (response)=> {
				console.log("could not send data")
			})
		}else if(this.state.elements.length == 0){
			this.setState({
				errorToDisplay: <p className="error-msg">Please add at least one Form Element</p>
			})
		}else{
			this.setState({
				errorToDisplay: <p className="error-msg">Please Enter a Name for the Form</p>
			})
		}
	}
	
	editElement = (e) =>{
		var elementToEdit = this.state.elements[e.target.id];
		var theDetailsPanel;
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

	closeDetailsPanel = (e) => {
		e.preventDefault();
		this.setState({
			detailsPanel: null
		})
	}

	deleteElement = (e) => {
		var elementsToUpdate = this.state.elements;

		elementsToUpdate.splice(e.target.id, 1);
		this.setState({
			elements: elementsToUpdate
		}, ()=>{
			this.generateElements();
		});
	}

	hideFlashMsg = ()=>{
		setTimeout(()=>{
		  var flashMsg = document.querySelector(".dashboard-flash-msg");
		  if (flashMsg) {
			flashMsg.style.opacity = 0;
		  }
		}, 1000);
		setTimeout(()=>{this.setState({flashMsg: ''})}, 3000);
	}

	copyLink = (e) =>{
		var formId = window.location.pathname.substr(6)
		var textToCopy = "http://localhost:3000/form/" + formId;
		if (window.getSelection) {window.getSelection().removeAllRanges();}
		else if (document.selection) {document.selection.empty();}
		
		const el = document.createElement('textarea');
		el.value = textToCopy;
		document.body.appendChild(el);
		el.select();
		el.setSelectionRange(0, 99999); /* For mobile devices */
		document.execCommand('copy');
		document.body.removeChild(el);
	
		this.setState({
		  flashMsg: <p className="dashboard-flash-msg">Link Copied!</p>
		}, this.hideFlashMsg
	  )
	
	
	}

	render() {
		if (this.state.displayData) {
			return (
			<div className="theForm editable-form">
			    <Navbar isAuth={true} />
				<h2 className="editable-form-heading">Edit Form</h2>
				<div className="edit-form-header">
					<p>Created On: {this.state.time}</p>
                    <button className="dashboard-editing-btns" onClick={this.copyLink}>Copy Link</button>
				</div>
				{this.state.flashMsg}
				<div className="form-name-container">
					<label>Name of Form: </label>
					<input className="formName-input" value={this.state.formName} onChange={(e)=>{e.preventDefault(); this.setState({formName: e.target.value})}} type="text" name="formName" autoComplete="off" />
				</div>

				{ this.state.generatedElementsList }
				{ this.state.detailsPanel }
				<AddFormElements addElement={(element)=> this.addElement(element)}/>
				{ this.state.errorToDisplay }
				<button onClick={this.updateForm} className="end-of-form-btn">Update</button>
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