import React, { Component } from 'react';
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import Search from './component/users/Search';
import Alert from './component/layout/Alert';
import './App.css';
import axios from 'axios';

// class-based component
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
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

  // Search Github users
  searchUsers =  async (text) => {
    this.setState({ loading: true});
    console.log(text);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data.items);
    this.setState({ users: res.data.items, loading: false });
    console.log(text)
  }

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null}), 2000);
  }
  // life cycle method that runs at a certain point when the components are loaded
  render() {
    return (
      // has to have one parent element
      <div className='App'>
        <Navbar title="Github Finder" icon="fab fa-github"/>
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={this.state.users.length > 0 ? true : false }
                  setAlert={this.setAlert} 
          />
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
