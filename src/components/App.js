import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import Dashboard from './Dashboard';
import LoginPage from './login/LoginPage';
import SettingsPage from './settings/SettingsPage';

const checkAuth = () => {
  const token = localStorage.getItem('user');

  if (!token) return false;

  return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login'
      }} />
    )
  )} />
)

const IsAuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Redirect to={{
        pathname: "/"
      }} /> 
    ) : (
      <Component {...props} />
    )
  )} />
)

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AuthRoute exact path="/" component={Dashboard} />
        <IsAuthRoute exact path="/login" component={LoginPage} />
        <AuthRoute exact path="/settings" component={SettingsPage} />
      </div>
    </Router>
  );
} 

export default App;