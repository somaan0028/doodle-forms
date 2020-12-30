import React, { Component } from 'react';
import { AuthContext } from '../Context/AuthContext';
import {NavLink} from 'react-router-dom';
import loadingGif from '../loading_gif.gif'
import Navbar from '../Home/Navbar.js';

class Dashboard extends Component {

  static contextType = AuthContext;

  state = {
    dashboard: null,
    listOfForms: null,
    generatedFormList: null,
    displayData: false
  }
  componentDidMount(){
    const { checkAuthAndReturnData } = this.context;

    checkAuthAndReturnData('AllCreatedForms')
    .then((result)=>{
      console.log("Logged In. Data Returned:")
      console.log(result);
      this.setState({
        listOfForms: result,
        displayData: true
      }, ()=>{this.generateFormList()})
    })
    .catch((err)=>{
      console.log("Error: " + err);
    });
  }

  generateFormList = ()=>{
    var listOfForms = this.state.listOfForms;
    var generatedFormList = listOfForms.map((form)=>{
      return <div key={form._id} >
        <p>{form.formName}</p>
        <NavLink to={`/edit/${form._id}`}>Edit</NavLink>
        <NavLink to={`/responses/${form._id}`}>View Responses</NavLink>
      </div>
    })
    this.setState({
      generatedFormList: generatedFormList
    });
  }

  render(){
    if (this.state.displayData) {
      return (
        <div className="sign-up-container">
        <Navbar isAuth={true} />
          <h2>Dashboard</h2>
          {this.state.generatedFormList}
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