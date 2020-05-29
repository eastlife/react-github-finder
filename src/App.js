import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import User from './component/users/User';
import Search from './component/users/Search';
import Alert from './component/layout/Alert';
import About from './component/pages/About';
import './App.css';

import GithubState from './context/github/GithubState';

const App = () => {
  const [alert, setAlert] = useState(null);

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000);
  }
  // life cycle method that runs at a certain point when the components are loaded
  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar title="Github Finder" icon="fab fa-github"/>
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search setAlert={showAlert}/>
                  <Users />
                </Fragment>
              )} />
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/user/:login' component={User}/>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
