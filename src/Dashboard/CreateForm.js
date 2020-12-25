import React, { Component } from 'react';
import axios from 'axios';

import SingleLine from '../Form-Elements/SingleLine';
import RadioBtn from '../Form-Elements/RadioBtn';
import Checkboxes from '../Form-Elements/Checkboxes';
import Textarea from '../Form-Elements/Textarea';
import AddFormElements from './AddFormElements';
import { AuthContext } from '../Context/AuthContext';

class CreateForm extends Component {

    static contextType = AuthContext;

	state = {
		formName: null,
		elements: [],
		generatedElementsList:[]
    }
    
    // componentWillMount(){
        
    // }

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
		// console.log(generatedElements);
	}
	
	componentDidMount(){
		const { checkAuthAndReturnData } = this.context;
        checkAuthAndReturnData();
		console.log(this.state.elements);
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

	saveForm = () => {
		axios({
			method: 'post',
			url: '/saveform',
			data: {
				formName: this.state.formName,
				formElements: this.state.elements
			}
		})
		.then((response) => {
            console.log(response.data.formID);
            var redirectTo = "/edit/" + response.data.formID;
            console.log("about to redirect")
            this.props.history.push( redirectTo );
		})
		.catch((response) => {
			console.log("could not send data to /saveform")
		})
	}
	
	hitBackend = () => {
		axios.get('/test')
		.then((response) => {
		console.log(response.data)
		})
	}

	render() {
		return (
		<div className="editable-form">
			<AddFormElements addElement={(element)=> this.addElement(element)}/>
			{/* <button onClick={this.generateElements} >Generate Elements</button> */}
			<input onChange={(e)=>{this.setState({formName: e.target.value})}} type="text" name="form-name" placeholder="Name of Form" />
			{ this.state.generatedElementsList }
			<button onClick={this.saveForm}>Create</button>
			{/* <button onClick={this.hitBackend}>Test</button> */}
		</div>
		);
	}
}

export default CreateForm;