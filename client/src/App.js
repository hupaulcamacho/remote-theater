import React from 'react';
import Navbar from './Components/Navbar'
import { Route, Switch} from 'react-router-dom'
import './App.css';
import AuthForm from './Components/AuthForm'
import VideoPage from './Components/VideoPage';
import Main from './Components/Main'
import Signup from './Components/Signup';


function App() {
  return(
    <div className="App">

          

          {sessionStorage.currentUserid ? <Navbar /> : null}
      

          <Switch>
            <Route exact path={"/"}>
              <AuthForm />
            </Route>
            {/* <Route path={"/signup"}>
              <Signup />
            </Route> */}
            <Route path={'/main'}> 
              <Main /> 
            </Route>
            <Route path={'/video'}>
              <VideoPage id ={2}/>
            </Route>
          </Switch>
        </div>
      );

}




export default App;
