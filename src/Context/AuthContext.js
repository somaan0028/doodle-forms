import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isLoggedIn: false
  }

  // checks whether user is authenticated or not. If logged in, then returns the requested data e.g. "all forms" or a single form 
  checkAuthAndReturnData = (requiredData, formID = null) => {
    return new Promise((resolve, reject)=>{
      axios({
        method: 'post',
        url: '/authtest',
        data: {
          requiredData:  requiredData,
          formID: formID
        }
      })
      .then((response) => {
          // handle success
          var result = response.data;
          if (result == "Wrong Form ID") {
            this.props.history.push("/pagenotfound");
          }else if (!result) {
            // If not authenticated
            this.props.history.push("/login");
            reject(false);
          }else{
            // If authenticated
            this.setState({
              isLoggedIn: true
            }, ()=>{
              resolve(result);
            });
          }
      })
      .catch((error) => {
          // handle error
          this.props.history.push("/Login");
          reject(false);
      })
    });
  }
  
  render() { 
    return (
      // To make the context available to all the components
      <AuthContext.Provider value={{ checkAuthAndReturnData: this.checkAuthAndReturnData, isLoggedIn: this.state.isLoggedIn}}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthContextProvider);