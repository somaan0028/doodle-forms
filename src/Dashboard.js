import React, { Component } from 'react';
import { AuthContext } from './AuthContext';
import {NavLink} from 'react-router-dom';

class Dashboard extends Component {

  static contextType = AuthContext;

  state = {
    dashboard: null,
  }
  componentDidMount(){
    const { toggleAuth } = this.context;

    toggleAuth()

  }

  render(){
    return (
      <div className="sign-up">
        <h2>Dashboard</h2>
        <ul>
            <li><p>The First Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
            <li><p>The Second Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
            <li><p>The Third Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
            <li><p>The Fourth Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
            <li><p>The Fifth Dummy Form</p><span><button>Edit Form</button><button>View Responses</button></span></li>
        </ul>
        <NavLink to="/create">Create New Form</NavLink>
      </div>
    );
  }
}

export default Dashboard