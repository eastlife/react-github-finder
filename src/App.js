import React, { Fragment, Component } from 'react';
import Navbar from './component/layout/Navbar'
import './App.css';

// class-based component
class App extends Component {
  // life cycle method that runs at a certain point when the components are loaded
  render() {
    const name = 'John Doe';

    return (
      // has to have one parent element
      <div className='App'>
        <Navbar title="Github Finder" icon="fab fa-github"/>
      </div>
    );
    // An alternative of javascipt approach
    // return React.createElement('div', { className: 'App' }, 
    // React.createElement('h1', null, 'Hello from React'))
  }
}

export default App;
