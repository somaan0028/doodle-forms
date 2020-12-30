import React, { Component } from 'react';
import Navbar from '../Home/Navbar.js';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
class Signup extends Component {

  state = {
    abc: null,
  }

  componentDidMount(){
    axios.get('/authtest')
    .then((result)=>{
      if (result.data) {
        this.props.history.push("/dashboard");
      }
    })
  }

  handleSubmit = async (e) => {
    const form = document.querySelector('form');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    // form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // reset errors
      emailError.textContent = '';
      passwordError.textContent = '';

      // get values
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      try {
        const res = await fetch('/signup', { 
          method: 'POST', 
          body: JSON.stringify({ email, password }),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
          emailError.textContent = data.errors.email;
          passwordError.textContent = data.errors.password;
        }
        if (data.user) {
          // location.assign('/');
          this.props.history.push("/dashboard");
        }

      }
      catch (err) {
        console.log(err);
        console.log("Req not made...")
      }

    // });
  }

  render(){
    return (
      <div className="auth-container">
      	<Navbar isAuth={false} />
        <form className="auth-form signup-form" onSubmit={this.handleSubmit}>
            <h2 className="auth-heading">Sign up</h2>
            {/* <label className="auth-labels" htmlFor="email">Email</label> */}
            <input className="auth-inputs" type="text" name="email" placeholder="Email" required />
            <div className="email error"></div>
            {/* <label className="auth-labels" htmlFor="password">Password</label> */}
            <input className="auth-inputs" type="password" name="password" placeholder="Password" required />
            <div className="password error"></div>
            <button className="auth-buttons">Sign up</button>
            <button className="demo-user">Login In using Demo User</button>
            <p className="auth-redirect">Already have an account? <NavLink to="/login" >Login</NavLink></p>
        </form>
      </div>
    );
  }
}

export default Signup