import React, { Component } from 'react';
import Navbar from '../Home/Navbar.js';
import axios from 'axios';

class Login extends Component {

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
        const res = await fetch('/login', { 
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
      }
    // });
  }

  render(){
    return (
      <div className="log-in">
			  <Navbar isAuth={false} />
        <form onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input type="text" name="email"  />
          <div className="email error"></div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <div className="password error"></div>
          <button>login</button>
        </form>
      </div>
    );
  }
}

export default Login