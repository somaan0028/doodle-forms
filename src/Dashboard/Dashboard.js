import React, { Component } from 'react';
import { AuthContext } from '../Context/AuthContext';
import {NavLink} from 'react-router-dom';

class Dashboard extends Component {

  static contextType = AuthContext;

  state = {
    dashboard: null,
    listOfForms: null,
    generatedFormList: null
  }
  componentDidMount(){
    const { checkAuthAndReturnData } = this.context;

    // var retrievedFormList = checkAuthAndReturnData('AllCreatedForms');
    // this.setState({
    //   listOfForms: retrievedFormList
    // })

    checkAuthAndReturnData('AllCreatedForms')
    .then((result)=>{
      console.log("Logged In. Data Returned:")
      console.log(result);
      this.setState({
        listOfForms: result
      }, ()=>{this.generateFormList()})
    })
    .catch((err)=>{
      console.log("Error: " + err);
    });
  }

  generateFormList = ()=>{
    var listOfForms = this.state.listOfForms;
    var generatedFormList = listOfForms.map((form)=>{
      return <div key={form._id} >
        <p>{form.formName}</p>
        <NavLink to={`/edit/${form._id}`}>Edit</NavLink>
        <NavLink to={`/responses/${form._id}`}>View Responses</NavLink>
      </div>
    })
    this.setState({
      generatedFormList: generatedFormList
    });
  }

  render(){
    return (
      <div className="sign-up">
        <h2>Dashboard</h2>
        {/* <ul>
            <li><p>The First Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
            <li><p>The Second Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
            <li><p>The Third Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
            <li><p>The Fourth Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
            <li><p>The Fifth Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
        </ul> */}
        {this.state.generatedFormList}
        <NavLink to="/create">Create New Form</NavLink>
      </div>
    );
  }
}

export default Dashboard