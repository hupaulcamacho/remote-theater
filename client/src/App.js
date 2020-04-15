import React from 'react';
import Navbar from './Components/Navbar'
import AuthForm from './Container/AuthForm'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Main from './Components/Main'
import Signup from './Container/Signup'

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      userLoggedIn: false,
      password: "",
      email: ""
    }
  }

  logIn = (email, password) => {
    this.setState({
      userLoggedIn: true,
      password: password,
      email: email
    })
  }

  signOut = () => {
    this.setState({
      userLoggedIn: false
    })
  }

  signup = (password, email) => {
    this.setState({
      userLoggedIn: true,
      email: email,
      password: password
    })
  }
  
render() {
  let { userLoggedIn } = this.state
  if (!userLoggedIn) {
    return (
      <div className="App">

        <h1 className="appName"> Remote Theater </h1>

        <Switch>
          {/* home page route for when the user is not logged in*/}
          <Route exact path="/"
            render={
              (routeProps) => {
                return (
                  <AuthForm
                    logIn={this.logIn}
                    userLoggedIn={this.state.userLoggedIn}
                    history={routeProps.history} />)
              }
            } />

          {/* sign up route for when a user wants to create an account */}
          <Route path="/SignUp" render={
            (routeProps) => {
              return (
                <Signup history={routeProps.history} signup={this.signup} />
              )
            }
          } />
          <Redirect to="/" />
        </Switch>
      </div>
    )

  } else {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/main' component={Main} />
      </Switch>
    </div>
  );
}
}
}


export default App;
