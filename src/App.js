import React, { Component } from 'react';
import CreateForm from './Dashboard/CreateForm';
import EditableForm from './Dashboard/EditableForm';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Home/Navbar.js';
import Home from './Home/Home.js';
import Signup from './auth/Signup.js';
import Login from './auth/Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import AuthContextProvider from './Context/AuthContext';
import Responses from './Responses/Responses';
import FormToFill from './Responses/FormToFill';

import SubmissionSuccess from './Responses/SubmissionSuccess'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AuthContextProvider>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Dashboard' component={Dashboard} />
            <Route path='/create' component={CreateForm} />
            <Route path='/edit/:form_id' component={EditableForm} />
            <Route path='/responses/:form_id' component={Responses} />
            <Route path='/form/:form_id' component={FormToFill} />
            <Route path='/formsubmitted' component={SubmissionSuccess} />
            {/* <EditableForm /> */}
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    );
  }
}

export default App;