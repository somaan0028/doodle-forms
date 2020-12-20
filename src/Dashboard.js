import React, { Component } from 'react';

class Dashboard extends Component {

  state = {
    abc: null,
  }
  componentDidMount(){

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
      </div>
    );
  }
}

export default Dashboard