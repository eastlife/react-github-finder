import React, {Component} from 'react';
import './App.css';

// class-based component
class App extends Component {
  // life cycle method that runs at a certain point when the components are loaded
  render() {
    return (
      <div className="App">
        <h1>Hello from React</h1>
      </div>
    );
  }
}

export default App;
