import React, { Component } from 'react';
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import Search from './component/users/Search';
import './App.css';
import axios from 'axios';

// class-based component
class App extends Component {
  state = {
    users: [],
    loading: false
  }
  // use axios to do http request

  // sync way to GET request
  // componentDidMount() {
  //   axios.get('https://api.github.com/users').then(res => console.log(res.data));
  // }

  // async way to GET request
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data, loading: false });
    console.log(res.data);
  }

  // life cycle method that runs at a certain point when the components are loaded
  render() {
    return (
      // has to have one parent element
      <div className='App'>
        <Navbar title="Github Finder" icon="fab fa-github"/>
        <div className="container">
          <Search />
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </div>
    );
    // An alternative of javascipt approach
    // return React.createElement('div', { className: 'App' }, 
    // React.createElement('h1', null, 'Hello from React'))
  }
}

export default App;
