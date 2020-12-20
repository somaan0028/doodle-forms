import React, { Component } from 'react';
import EditableForm from './EditableForm';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Signup from './Signup.js';
import Login from './Login.js';
import Dashboard from './Dashboard.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Dashboard' component={Dashboard} />
          <Route exact path='/edit' component={EditableForm} />
          {/* <EditableForm /> */}

        </div>
      </BrowserRouter>
    );
  }
}

export default App;