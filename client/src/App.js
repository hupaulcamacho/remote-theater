import React from 'react';
import Navbar from './Components/Navbar'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import AuthForm from './Components/AuthForm'
// import Signup from './Container/Signup'
import Main from './Components/Main'

function App() {
  return(
    <div className="App">
          

          {sessionStorage.currentUserid ? <Navbar /> : null}
          <Switch>
            <Route exact path={"/"}>
              <AuthForm />
            </Route>
            <Route path={'/main'}> 
            <Main /> 
            </Route>
          </Switch>
        </div>
      );

}




export default App;
