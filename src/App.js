import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './component/layout/Navbar';
import User from './component/users/User';
import Alert from './component/layout/Alert';
import Home from './component/pages/Home';
import About from './component/pages/About';
import './App.css';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {
  // life cycle method that runs at a certain point when the components are loaded
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar title="Github Finder" icon="fab fa-github"/>
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
