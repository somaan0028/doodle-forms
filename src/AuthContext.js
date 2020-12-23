import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

class AuthContextProvider extends Component {

  toggleAuth = () => {
    // make request to server
    axios.get('/authtest')
    .then((response) => {
        // handle success
        console.log("Server returned: " + response.data);
        var result = response.data;

        if (!result) {
          // If not authenticated
          console.log("Redirecting. Not logged In");
          this.props.history.push("/login");
        }else{
          // If authenticated
          console.log("Logged In");
          return result
        }
    })
    .catch((error) => {
        // handle error
        console.log(error);
        console.log("In the catch method of axios");
        this.props.history.push("/Login");
    })
  }
  
  render() { 
    return (
      <AuthContext.Provider value={{ toggleAuth: this.toggleAuth}}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default withRouter(AuthContextProvider);