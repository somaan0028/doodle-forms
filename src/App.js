import React, { Component } from 'react';
import CreateForm from './Dashboard/CreateForm';
import EditableForm from './Dashboard/EditableForm';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Navbar from './Home/Navbar.js';
import Home from './Home/Home.js';
import Signup from './auth/Signup.js';
import Login from './auth/Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import AuthContextProvider from './Context/AuthContext';
import Responses from './Responses/Responses';
import FormToFill from './Responses/FormToFill';
import axios from 'axios';

import SubmissionSuccess from './Responses/SubmissionSuccess'

class App extends Component {

  // state = {
  //   isAuthenticated: false,
  //   asyncComplete: false
  // }

  // requireAuth = ()=>{
  //   console.log("In requireAuth()");
  //   this.setState({
  //     asyncComplete: false
  //   }, ()=>{

  //     axios({
  //       method: 'get',
  //       url: '/authtest',
  //     })
  //     .then((response) => {
  //       console.log("requireAuth returned: " + response.data);
  //       // return response.data;
  //       this.setState({
  //         isAuthenticated: response.data,
  //         asyncComplete: true,
  //       })
  //     })
  //     .catch((error) => {
  //       console.log("Error in requireAuth()");
  //       return false;
  //     })
  //     console.log("Below the axios");
  //   })
  // }
  
  // asyncComplete = ()=>{
  //   if (this.state.asyncComplete) {
  //     console.log("asyncComplete");
  //     return 'completed';
  //   }else{
  //     console.log("async not complete");
  //     // setTimeout(this.asyncComplete, 5000);
  //   }
  // }

  render() {
    return (
      <BrowserRouter>
        <AuthContextProvider>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/Dashboard' component={Dashboard} />
            <Route exact path='/create' component={CreateForm} />
            <Route exact path='/edit/:form_id' component={EditableForm} />
            <Route exact path='/responses/:form_id' component={Responses} />
            <Route exact path='/form/:form_id' component={FormToFill} />
            <Route exact path='/formsubmitted' component={SubmissionSuccess} />
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    );
  }
}

export default App;