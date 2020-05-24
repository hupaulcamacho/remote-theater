import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import AuthForm from './Components/AuthForm';
import VideoPage from './Components/VideoPage';
import Main from './Components/Main';
import Signup from './Components/Signup';
import Account from './Components/Account';
import About from './Components/About';


function App() {
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ isloggedIn, setLoggedIn ] = useState(false);
  const [ message, setMessage ] = useState("");
  const [ signup, setSignUpForm ] = useState(false)

  const renderVideo = (routeprops) => {
    return <VideoPage routeprops={routeprops}  />
  }

  return(
    <div className="App">

          {isloggedIn ? <Navbar /> : null}
      
          <Switch>
            <Route exact path={"/"}>
              <AuthForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isloggedIn={isloggedIn}
                setLoggedIn={setLoggedIn}
                message={message}
                setMessage={setMessage}
                setSignUpForm={setSignUpForm}
              />
            </Route>
            
            <Route exact path={"/signup"}> 
              <Signup
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isloggedIn={isloggedIn}
                setLoggedIn={setLoggedIn}
                message={message}
                setMessage={setMessage}
                setSignUpForm={setSignUpForm} 
              />
            </Route>

            <Route path={'/main'}> 
              <Main 
              isloggedIn={isloggedIn} 
              setLoggedIn={setLoggedIn} /> 
            </Route>

            <Route path={'/video'}>
              <VideoPage id ={2} user= {name || 'Chuck'}/>
            </Route>
            <Route path='/showroom/:id' render={renderVideo()} />
            <Route path='/account' component={Account} 
            setMessage = {setMessage}
            message = {message}
            />
            <Route path='/about' component={About} />
          </Switch>
        </div>
      );
}

export default App;
