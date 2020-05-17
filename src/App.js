import React, { Fragment, Component } from 'react';
import './App.css';

// class-based component
class App extends Component {
  // life cycle method that runs at a certain point when the components are loaded
  render() {
    return (
      // has to have one parent element
      <Fragment>
        <h1>Hello from React</h1>
        <h2>Goodbye</h2>
      </Fragment>
    );
    // An alternative of javascipt approach
    // return React.createElement('div', { className: 'App' }, 
    // React.createElement('h1', null, 'Hello from React'))
  }
}

export default App;
