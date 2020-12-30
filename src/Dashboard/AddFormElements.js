import React, { Component } from 'react';
import SingleLineInputDetails from '../Detail-Panels/SingleLineInputDetails';
import TextareaInputDetails from '../Detail-Panels/TextareaInputDetails';
import RadioBtnDetailsPanel from '../Detail-Panels/RadioBtnDetailsPanel';
import CheckboxesDetailsPanel from '../Detail-Panels/CheckboxesDetailsPanel';

class addFormElement extends Component {
	state = {
		optionsListClass: "hideOptions",
		detailsPanel: null
	}

	toggleOptions = () => {
		console.log("Button clicked");
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
				<button className="add-form-elements-btn" onClick={this.toggleOptions} ><i class="fa fa-plus" aria-hidden="true"></i></button>
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