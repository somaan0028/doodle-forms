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
    displayData: false,
    formTime: '12-Jul-2077'

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
        <SingleResponse response={response} index={index} key={index}/>
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
          <h2 className="responses-heading">Responses</h2>
          <p className="form-name">{this.state.formName}</p>
          <div className="form-details-container">
            <p className="form-detail">{`No. of Responses: ${this.state.listOfResponses.length}`}</p>
            <p className="form-detail">{`Created On: ${this.state.formTime}`}</p>
          </div>
          <div className="responses-list-container">
            {this.state.generatedResponseList}
          </div>
          <NavLink className="back-to-dashboard" to="/dashboard">Back to Dashboard</NavLink>
        </div>
      );
    }else{
      return(
        <img className="loading-gif" src={loadingGif} alt="loading..." />
      )
    }
  }
}

export default Dashboard