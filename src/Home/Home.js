import React, { Component } from 'react';
import Navbar from '../Home/Navbar.js';
import axios from 'axios';

class Home extends Component {

  componentDidMount(){
    axios.get('/authtest')
    .then((result)=>{
      if (result.data) {
        this.props.history.push("/dashboard");
      }
    })
  }

  render() { 
    return ( 
      <div className="home">
        <Navbar isAuth={false} />
        <h1>Welcome to the home page</h1>
      </div>
    );
  }
}
 
export default Home;