import React, { Component } from 'react';
import { AuthContext } from '../Context/AuthContext';
import {NavLink} from 'react-router-dom';
import loadingGif from '../loading_gif.gif'
import Navbar from '../Home/Navbar.js';
import DashboardListItem from './DashboardListItem';
import axios from 'axios';

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
      console.log(form);
      return <DashboardListItem form={form} deleteForm={this.deleteForm} copyLink={this.copyLink} key={form._id} />
    });
    if (generatedFormList.length == 0) {
      console.log("No forms created yet!");
      generatedFormList = <div className="no-forms-to-show-div">
        <p>No Forms to show yet!<br/>Create one by clicking the button above.</p>
      </div>
    }
    this.setState({
      generatedFormList: generatedFormList
    });
  }

  deleteForm = (e) =>{
    console.log("delete the form: " + e.target.id);
    axios({
      method: 'post',
      url: '/deleteform',
      data: {
        formID: e.target.id
      }
    })
    .then((response)=>{
      if (response.data) {
        console.log("Form has been deleted");
        var formList = this.state.listOfForms;
        var newFormList = formList.filter((form)=>{
          return form._id !== e.target.id;
        });
        this.setState({
          listOfForms: newFormList,
        }, ()=>{this.generateFormList()});

      }else{
        console.log("couldn't delete form. Server returned False")
      }
    })
    .catch(()=>{
      console.log("couldn't delete form. In catch method of /deleteform ")
    })
  }
  copyLink = (e) =>{
    console.log("copy link for form: " + e.target.id);
    var textToCopy = "http://localhost:3000/edit/" + e.target.id;
    // if (window.getSelection) {window.getSelection().removeAllRanges();}
    // else if (document.selection) {document.selection.empty();}
    textToCopy.select();
    // textToCopy.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");

  }

  render(){
    if (this.state.displayData) {
      return (
        <div className="dashboard-container">
          <Navbar isAuth={true} />
          <div className="dashboard-header">
            <h2>Dashboard</h2>
            <NavLink to="/create" className="create-new-form-btn">Create New Form</NavLink>
            <p>Your Forms:</p>
          </div>
          <div className="dashboard-list-container">
            <div className="dashboard-list-headings-container">
              <p className="dashboard-list-heading name-heading">Form Name</p>
              <p className="dashboard-list-heading date-heading">Date</p>
              <p className="dashboard-list-heading responses-heading">Responses</p>
              <p className="dashboard-list-heading empty-heading"></p>
            </div>
            {this.state.generatedFormList}
          </div>
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