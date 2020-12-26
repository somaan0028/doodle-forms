import React, { Component } from 'react';

class Signup extends Component {

  state = {
    abc: null,
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
      <div className="sign-up">
        <form onSubmit={this.handleSubmit}>
            <h2>Sign up</h2>
            <p>Please fill in this form to create an account.</p>
            <hr/>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" required />
            <div className="email error"></div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
            <div className="password error"></div>
            <button>Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup