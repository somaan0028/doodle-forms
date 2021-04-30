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
    displayData: false,
    flashMsg: '',
  }
  componentDidMount(){
    const { checkAuthAndReturnData } = this.context;

    // checks auth and then gets all the form created by the user if logged in
    checkAuthAndReturnData('AllCreatedForms')
    .then((result)=>{

      this.setState({
        listOfForms: result,
        displayData: true,

      }, ()=>{this.generateFormList()})
    })
    .catch((err)=>{
      console.log("Error: " + err);
    });
  }

  // generates an array of form names and details that the user has created
  generateFormList = ()=>{
    var listOfForms = this.state.listOfForms;
    var generatedFormList = listOfForms.map((form)=>{
      return <DashboardListItem form={form} deleteForm={this.deleteForm} copyLink={this.copyLink} key={form._id} />
    });
    if (generatedFormList.length == 0) {
      generatedFormList = <div className="no-forms-to-show-div">
        <p>No Forms to show yet!<br/>Create one by clicking the button above.</p>
      </div>
    }
    this.setState({
      generatedFormList: generatedFormList
    });
  }
  
  // fades out the flash message e.g. "link copied" or "form deleted" e.t.c
  hideFlashMsg = ()=>{
    setTimeout(()=>{
      var flashMsg = document.querySelector(".dashboard-flash-msg");
      if (flashMsg) {
        flashMsg.style.opacity = 0;
      }
    }, 1000);
    setTimeout(()=>{this.setState({flashMsg: ''})}, 3000);
  }

  // delets a form by sending a request to the server with that forms id. Server deletes it from the db
  deleteForm = (e) =>{
    axios({
      method: 'post',
      url: '/deleteform',
      data: {
        formID: e.target.id
      }
    })
    .then((response)=>{
      if (response.data) {
        var formList = this.state.listOfForms;
        var newFormList = formList.filter((form)=>{
          return form._id !== e.target.id;
        });
        this.setState({
          listOfForms: newFormList,
          flashMsg: <p className="dashboard-flash-msg">Form Successfully Deleted!</p>
        }, ()=>{
          this.generateFormList();
          this.hideFlashMsg();
        });

      }else{
        console.log("couldn't delete form. Server returned False")
      }
    })
    .catch(()=>{
      console.log("couldn't delete form. In catch method of /deleteform ")
    })
  }

  // when user clicks on the 'copy link' btn of a form. The invite link copied to clipboard
  copyLink = (e) =>{
    var textToCopy = "http://localhost:3000/form/" + e.target.id;
    if (window.getSelection) {window.getSelection().removeAllRanges();}
    else if (document.selection) {document.selection.empty();}
    
    const el = document.createElement('textarea');
    el.value = textToCopy;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    document.body.removeChild(el);

    // to show the flach msg the "link copied"
    this.setState({
      flashMsg: <p className="dashboard-flash-msg">Link Copied!</p>
    }, this.hideFlashMsg)
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
          {this.state.flashMsg}
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