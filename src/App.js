import React, {useState} from 'react';
import './App.css';
import LoginForm from './components/Login/Login';
import Home from './components/Home/Home';
import UpdateUser from './components/User/UpdateUser';
import AlertComponent from './components/AlertComponent/AlertComponent'; 
import isAuthenticated from './components/Services/AuthService';
import { withRouter } from "react-router-dom";
import history from './components/History/History';
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App(props) {
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router history={history}>
    <div className="App">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <form className="form-inline my-2 my-lg-0" style={{marginLeft: '90%', display: isAuthenticated() ? 'block' : 'none'}}>
                      <button onClick={logOut} className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
                  </form>
              </div>
          </nav>
          <div className="w3-sidebar w3-bar-block w3-card w3-animate-left" style={{width: '25%', display: isAuthenticated() ? 'block' : 'none'}} id="mySidebar">
              <button className="w3-bar-item w3-button w3-large"
              onClick={w3_close}>Close &times;</button>
              <button type="button" onClick={() => history.push('/home')} className="w3-bar-item w3-button">Add Users</button>
              <button type="button" onClick={() => history.push('/update')} className="w3-bar-item w3-button">Update Users</button>
          </div>

            <div id="main" style={{marginLeft: '25%', display: isAuthenticated() ? 'block' : 'none'}}>
                <div className="w3-teal">
                <button id="openNav" className="w3-button w3-teal w3-xlarge" onClick={w3_open}>&#9776;</button>
                </div>
                <div className="w3-container">
                <Switch>
                <PrivateRoute path="/home">
                  <Home/>
                </PrivateRoute>
                <PrivateRoute path="/update">
                  <UpdateUser/>
                </PrivateRoute>
                </Switch>
                <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
                </div>
            </div>
          <Switch>
            <LoginRoute path="/" exact={true}>
            <LoginForm showError={updateErrorMessage} />
            </LoginRoute>
            <LoginRoute path="/login">
              <LoginForm showError={updateErrorMessage} />
            </LoginRoute>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
}

const logOut = (props) => {
  localStorage.removeItem('userToken');
  props.history.push('/login');
}

function w3_open() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}

function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

// Route to home page if session is active
function LoginRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default withRouter(App);
