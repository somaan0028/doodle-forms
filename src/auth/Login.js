import React, { Component } from 'react';
import Navbar from '../Home/Navbar.js';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

  state = {
    abc: null,
  }

  componentDidMount(){
    // if user is authenticated, then redirect to dashboard
    axios.get('/authtest')
    .then((result)=>{
      if (result.data) {
        this.props.history.push("/dashboard");
      }
    })
  }

  // logs in as demo user
  demo_login = async (e) => {

    e.preventDefault();

    const email = "demouser@gmail.com";
    const password = "123456";
    try {
      const res = await fetch('/login', { 
        method: 'POST', 
        body: JSON.stringify({ email, password }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();

      if (data.user) {
        this.props.history.push("/dashboard");
      }

    }
    catch (err) {
      console.log(err);
    }
  }

  // form submit
  handleSubmit = async (e) => {
    const form = document.querySelector('form');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    e.preventDefault();

    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    // get values
    const email = form.email.value;
    const password = form.password.value;
    
    // prevents empty fields
    if (!email || !email.replace(/\s/g,"")) {
      emailError.textContent = 'Please Enter an Email';
      return;
    }else if(!password){
      passwordError.textContent = 'Please Enter a Password';
      return;
    }

    try {
      const res = await fetch('/login', { 
        method: 'POST', 
        body: JSON.stringify({ email, password }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      if (data.errors) {
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
      }
      if (data.user) {
        this.props.history.push("/dashboard");
      }

    }
    catch (err) {
      console.log(err);
    }
  }

  render(){
    return (
      <div className="auth-container">
			  <Navbar isAuth={false} />
        <form className="auth-form login-form" onSubmit={this.handleSubmit}>
          <h2 className="auth-heading">Login</h2>
          <input className="auth-inputs" type="text" name="email" placeholder="Email" />
          <div className="email error"></div>
          <input className="auth-inputs" type="password" name="password" placeholder="Password" />
          <div className="password error"></div>
          <button className="auth-buttons">login</button>
            <button onClick={this.demo_login} className="demo-user">Login In as Demo User</button>
          <p className="auth-redirect">Don't have an account? <NavLink to="/signup" >Sign Up</NavLink></p>
        </form>
      </div>
    );
  }
}

export default Login