import React, { Component } from 'react';
import CreateForm from './CreateForm';
import EditableForm from './EditableForm';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Signup from './Signup.js';
import Login from './Login.js';
import Dashboard from './Dashboard.js';
import AuthContextProvider from './AuthContext';
import Responses from './Responses';
import FormToFill from './FormToFill';

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
            {/* <EditableForm /> */}
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    );
  }
}

export default App;