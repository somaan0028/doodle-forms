import React, { Component } from 'react';
import { AuthContext } from '../Context/AuthContext';
import {NavLink} from 'react-router-dom';
import SingleResponse from './SingleResponse';
import loadingGif from '../loading_gif.gif'
import Navbar from '../Home/Navbar.js';

// shows all the responses for a particular form
class Responses extends Component {

  static contextType = AuthContext;

  state = {
    formName: null,
    listOfResponses: null,
    generatedResponseList: null,
    displayData: false,
    formTime: null

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
    var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    // return convdataTime;
    return convdataTime;
    
}

  componentDidMount(){
    const { checkAuthAndReturnData } = this.context;

    if (window.location.pathname.substr(11).length !== 24) {
			this.props.history.push("/pagenotfound");
    }
    
    // Returns all responses of the form if logged in
    checkAuthAndReturnData('AllResponses', window.location.pathname.substr(11))
    .then((result)=>{
      console.log(result);
      this.setState({
        listOfResponses: result.responses,
        formName: result.formName,
        formTime: this.convertUnix(result.time),
				displayData: true
      }, ()=>{this.generateResponseList()})
    })
    .catch((err)=>{
      console.log("Error: " + err);
    });
  }

  // generated list of each single response
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

export default Responses