import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import User from './component/users/User';
import Search from './component/users/Search';
import Alert from './component/layout/Alert';
import About from './component/pages/About';
import './App.css';
import axios from 'axios';

// class-based component
class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
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
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data.items);
    this.setState({ users: res.data.items, loading: false });
  }

  // Get users repos
  getUserRepos = async (username) => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort-created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ repos: res.data, loading: false });
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Get single Github user
  getUser = async (username) => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false });
  }

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null}), 2000);
  }
  // life cycle method that runs at a certain point when the components are loaded
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar title="Github Finder" icon="fab fa-github"/>
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} 
                          clearUsers={this.clearUsers} 
                          showClear={this.state.users.length > 0 ? true : false }
                          setAlert={this.setAlert} 
                  />
                  <Users loading={this.state.loading} users={this.state.users}/>
                </Fragment>
              )} />
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/user/:login' render={props => (
                // the spread operator {...props} means it will pass whatever the input props into the User component as its props
                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={this.state.repos} user={this.state.user} loading={this.state.loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
      // has to have one parent element

    );
    // An alternative of javascipt approach
    // return React.createElement('div', { className: 'App' }, 
    // React.createElement('h1', null, 'Hello from React'))
  }
}

export default App;
