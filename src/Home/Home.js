import React, { Component } from 'react';
import {NavLink, withRouter } from 'react-router-dom';
import Navbar from '../Home/Navbar.js';
import axios from 'axios';
import homeImg from '../home-pic.png';

// home page
class Home extends Component {

  componentDidMount(){
    // redirects to dashboard if logged in
    axios.get('/authtest')
    .then((result)=>{
      if (result.data) {
        this.props.history.push("/dashboard");
      }
    })
  }

  render() { 
    return ( 
      <div className="home-container">
        <Navbar isAuth={false} />
        <div className="home">
          <div className="home-color-panel"></div>
          <div className="home-text-div">
            <div>
              <h1>Doodle Forms</h1>
              <p>Sign Up today and start creating your Forms!</p>
              <NavLink to="/signup" className="home-btns">Sign Up</NavLink>
              <NavLink to="/login" className="home-btns">Login</NavLink>
            </div>
            <img src={homeImg} />

          </div>
        </div>
      </div>
    );
  }
}
 
export default Home;