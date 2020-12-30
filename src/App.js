import React, { Component } from 'react';
import CreateForm from './Dashboard/CreateForm';
import EditableForm from './Dashboard/EditableForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Home/Navbar.js';
import Home from './Home/Home.js';
import Signup from './auth/Signup.js';
import Login from './auth/Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import AuthContextProvider from './Context/AuthContext';
import Responses from './Responses/Responses';
import FormToFill from './Responses/FormToFill';
import Page404 from './Page404'
import SubmissionStatus from './Responses/SubmissionStatus'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <AuthContextProvider>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/Dashboard' component={Dashboard} />
              <Route exact path='/create' component={CreateForm} />
              <Route exact path='/edit/:form_id' component={EditableForm} />
              <Route exact path='/responses/:form_id' component={Responses} />
              <Route exact path='/form/:form_id' component={FormToFill} />
              <Route exact path='/formsubmission' component={SubmissionStatus} />
              <Route path="*" component={Page404} />
            </Switch>
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    );
  }
}

export default App;