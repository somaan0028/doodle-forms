import React, { Component } from 'react';
import { AuthContext } from '../Context/AuthContext';
import {NavLink} from 'react-router-dom';
import SingleResponse from './SingleResponse';
import loadingGif from '../loading_gif.gif'
import Navbar from '../Home/Navbar.js';

class Dashboard extends Component {

  static contextType = AuthContext;

  state = {
    formName: null,
    listOfResponses: null,
    generatedResponseList: null,
    displayData: false

  }

  componentDidMount(){
    const { checkAuthAndReturnData } = this.context;

    if (window.location.pathname.substr(11).length !== 24) {
			console.log("Form length very short");
			this.props.history.push("/pagenotfound");
    }
    
    checkAuthAndReturnData('AllResponses', window.location.pathname.substr(11))
    .then((result)=>{
      console.log("Logged In. Data Returned:")
      console.log(result);
      this.setState({
        listOfResponses: result.responses,
        formName: result.formName,
				displayData: true
      }, ()=>{this.generateResponseList()})
    })
    .catch((err)=>{
      console.log("Error: " + err);
    });
  }

  generateResponseList = ()=>{
    var listOfResponses = this.state.listOfResponses;
    var generatedResponseList = listOfResponses.map((response, index)=>{
      return <div key={index} >
        <SingleResponse response={response} index={index}/>
      </div>
    })
    this.setState({
      generatedResponseList: generatedResponseList
    });
  }

  render(){
    if (this.state.displayData) {
      return (
        <div className="responses">
        	<Navbar isAuth={true} />
          <h2>Dashboard</h2>
          <h3>Responses</h3>
          <p>{this.state.formName}</p>
  
          {this.state.generatedResponseList}
          <NavLink to="/create">Create New Form</NavLink>
        </div>
      );
    }else{
      return(
        <img src={loadingGif} alt="loading..." />
      )
    }
  }
}

export default Dashboard