import React, { Component } from 'react';
import { AuthContext } from './AuthContext';
import {NavLink} from 'react-router-dom';
import SingleResponse from './SingleResponse';

class Dashboard extends Component {

  static contextType = AuthContext;

  state = {
    formName: null,
    listOfResponses: null,
    generatedResponseList: null
  }
  componentDidMount(){
    const { checkAuthAndReturnData } = this.context;

    checkAuthAndReturnData('AllResponses', window.location.pathname.substr(11))
    .then((result)=>{
      console.log("Logged In. Data Returned:")
      console.log(result);
      this.setState({
        listOfResponses: result.responses,
        formName: result.formName
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
    return (
      <div className="responses">
        <h2>Dashboard</h2>
        <h3>Responses</h3>
        <p>{this.state.formName}</p>

        {this.state.generatedResponseList}
        <NavLink to="/create">Create New Form</NavLink>
      </div>
    );
  }
}

export default Dashboard