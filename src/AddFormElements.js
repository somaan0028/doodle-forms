import React, { Component } from 'react';
import SingleLineInputDetails from './SingleLineInputDetails';
import TextareaInputDetails from './TextareaInputDetails';
import RadioBtnDetailsPanel from './RadioBtnDetailsPanel';
import CheckboxesDetailsPanel from './CheckboxesDetailsPanel';

class addFormElement extends Component {
	state = {
		optionsListClass: "hideOptions",
		detailsPanel: null
	}

	toggleOptions = () => {
		console.log("Button clicked");
		this.setState({
			optionsListClass: "showOptions"
		});
	}

	askForDetails = (e) => {
		// console.log(e.target.id);
		var theDetailsPanel;

		switch(e.target.id) {
			case "one-line-input-btn":
				console.log("Its one-line-input-btn");
				console.log(this.props);
				theDetailsPanel = <SingleLineInputDetails closeDetailsPanel={this.closeDetailsPanel} sendElement={(element)=>{this.props.addElement(element)}} />;
				break;

			case "textarea-input-btn":
				console.log("Its textarea-input-btn");
				theDetailsPanel = <TextareaInputDetails closeDetailsPanel={this.closeDetailsPanel} sendElement={(element)=>{this.props.addElement(element)}}/>;
				break;

			case "radio-input-btn":
				console.log("Its radio-input-btn");
				theDetailsPanel = <RadioBtnDetailsPanel closeDetailsPanel={this.closeDetailsPanel} sendElement={(element)=>{this.props.addElement(element)}}/>;
				break;

			case "checkbox-input-btn":
				console.log("Its checkbox-input-btn");
				theDetailsPanel = <CheckboxesDetailsPanel closeDetailsPanel={this.closeDetailsPanel} sendElement={(element)=>{this.props.addElement(element)}}/>;
				break;

			default:
				console.log("No element");
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
				<button onClick={this.toggleOptions} >Add Element</button>
				<div className={`${this.state.optionsListClass} options`}>
					<button onClick={this.askForDetails} id="one-line-input-btn">Add One Line Input</button>
					<button onClick={this.askForDetails} id="textarea-input-btn">Add Textarea</button>
					<button onClick={this.askForDetails} id="radio-input-btn">Add Radio Buttons</button>
					<button onClick={this.askForDetails} id="checkbox-input-btn">Add Checkboxes</button>
				</div>
				{ this.state.detailsPanel }
			</div>
		);
	}
}

export default addFormElement