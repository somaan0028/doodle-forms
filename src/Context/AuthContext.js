import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isLoggedIn: false
  }

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
          console.log("Server returned: " + response.data);
          var result = response.data;
          if (result == "Wrong Form ID") {
            console.log("Server said 'Wrong Form ID");
            this.props.history.push("/pagenotfound");
          }else if (!result) {
            // If not authenticated
            console.log("Redirecting. Not logged In");
            this.props.history.push("/login");
            reject(false);
          }else{
            // If authenticated
            console.log("Logged In");
            this.setState({
              isLoggedIn: true
            }, ()=>{
              resolve(result);
            });
            // console.log(result);
          }
      })
      .catch((error) => {
          // handle error
          console.log("In the catch method of axios in AuthContext()");
          console.log(error);
          this.props.history.push("/Login");
          reject(false);
      })
    });
  
  }
  
  render() { 
    return (
      <AuthContext.Provider value={{ checkAuthAndReturnData: this.checkAuthAndReturnData, isLoggedIn: this.state.isLoggedIn}}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default withRouter(AuthContextProvider);