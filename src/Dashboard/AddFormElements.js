import React, { Component } from 'react';
import SingleLineInputDetails from '../Detail-Panels/SingleLineInputDetails';
import TextareaInputDetails from '../Detail-Panels/TextareaInputDetails';
import RadioBtnDetailsPanel from '../Detail-Panels/RadioBtnDetailsPanel';
import CheckboxesDetailsPanel from '../Detail-Panels/CheckboxesDetailsPanel';

// this components is visible on the 'create element page' which the user clicks on the add a new element
class addFormElement extends Component {
	state = {
		optionsListClass: "hideOptions",
		detailsPanel: null
	}

	// Shows the list of form elements that can be added when plus btn clicked
	toggleOptions = () => {
		if(this.state.optionsListClass === 'showOptions'){
			this.setState({
				optionsListClass: "hideOptions"
			});
		}else{
			this.setState({
				optionsListClass: "showOptions"
			});
		}
	}

	// shows the appropriate details panel to add a new element. (e.g. asks for the question, mcq values e.t.c)
	askForDetails = (e) => {
		var theDetailsPanel;

		switch(e.target.id) {
			case "one-line-input-btn":
				theDetailsPanel = <SingleLineInputDetails closeDetailsPanel={this.closeDetailsPanel} sendElement={(element)=>{this.props.addElement(element)}} />;
				break;

			case "textarea-input-btn":
				theDetailsPanel = <TextareaInputDetails closeDetailsPanel={this.closeDetailsPanel} sendElement={(element)=>{this.props.addElement(element)}}/>;
				break;

			case "radio-input-btn":
				theDetailsPanel = <RadioBtnDetailsPanel closeDetailsPanel={this.closeDetailsPanel} sendElement={(element)=>{this.props.addElement(element)}}/>;
				break;

			case "checkbox-input-btn":
				theDetailsPanel = <CheckboxesDetailsPanel closeDetailsPanel={this.closeDetailsPanel} sendElement={(element)=>{this.props.addElement(element)}}/>;
				break;

			default:
				break;
		}
		this.setState({
			detailsPanel: theDetailsPanel,
			optionsListClass: "hideOptions"
		});
	}

	closeDetailsPanel = (e) => {
		e.preventDefault();
		this.setState({
			detailsPanel: null
		})
	}
	
	render(){
		return(
			<div className="add-form-element">
				<button className="add-form-elements-btn" onClick={this.toggleOptions} ><i className="fa fa-plus" aria-hidden="true"></i></button>
				<div className={`${this.state.optionsListClass} options `}>
					<button className="add-form-element-option" onClick={this.askForDetails} id="one-line-input-btn">Add One Line Input</button>
					<button className="add-form-element-option" onClick={this.askForDetails} id="textarea-input-btn">Add Textarea</button>
					<button className="add-form-element-option" onClick={this.askForDetails} id="radio-input-btn">Add Radio Buttons</button>
					<button className="add-form-element-option" onClick={this.askForDetails} id="checkbox-input-btn">Add Checkboxes</button>
				</div>
				{ this.state.detailsPanel }
			</div>
		);
	}
}

export default addFormElement