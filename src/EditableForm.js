import React, { Component } from 'react';
import SingleLine from './SingleLine';
import RadioBtn from './RadioBtn';
import Checkboxes from './Checkboxes';
import Textarea from './Textarea';
import AddFormElements from './AddFormElements';

class EditableForm extends Component {
	state = {
		elements: [
			{
				type: "Single-line",
				question: "Whats your name?",
			},
			{
				type: "Single-line",
				question: "How are you?",
			},
			{
				type: "Radio",
				question: "What is 2+2",
				values: [5, 6, 7, 8],
			},
			{
				type: "Checkboxes",
				question: "Select the animals",
				values: ["Frog", "Table", "Cow", "Chips"],
			},
			{
				type: "Textarea",
				question: "Write a note on life...max limit is 25 words",
				maxlength: 200,
			},
			{
				type: "Checkboxes",
				question: "Earth is flat",
				values: ["True", "False"],
			}
		],
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
		// console.log(generatedElements);
	}
	
	componentDidMount(){
		this.generateElements();
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

	render() {
		return (
		<div className="editable-form">
			<AddFormElements addElement={(element)=> this.addElement(element)}/>
			{/* <button onClick={this.generateElements} >Generate Elements</button> */}
			{ this.state.generatedElementsList }
		</div>
		);
	}
}

export default EditableForm;