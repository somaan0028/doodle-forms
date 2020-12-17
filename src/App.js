import React, { Component } from 'react';

class App extends Component {
  state = {
    name: "Imran",
  }
  render() {
    return (
      <div className="App">
        <h1>Welcome {this.state.name}</h1>
      </div>
    );
  }
}

export default App;