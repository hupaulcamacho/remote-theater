import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './utils/Auth'
import './App.css';

import PrivateRoute from './Components/PrivateRoute';
import AuthContainer from './Containers/AuthContainer';

import Home from './Components/Home'
import Navbar from './Components/Burger-Nav/Nav';
import VideoPage from './Components/VideoPage';
import Account from './Components/Account';
import MainPage from './testComponents/MainPage'
import About from './Components/About'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userToken: null,
      isUserLoggedIn: false,
    }
  }
  
  componentDidMount() {
    this.checkUserLoggedIn();
  }

  setUser = (user) => {
    console.log(user)
    // localStorage.setItem("user", JSON.stringify(user))
    this.setState({
      user: user,
      isUserLoggedIn: true,
    });
  }

  logoutUser = () => {
    // try {
    //   await axios.post('/api/auth/logout');
    //   await Auth.deauthenticateUser()
    //   this.checkUserLoggedIn()
    // } catch (err) {
    //   console.log('ERROR', err);
    // }

      axios
        .post('/api/auth/logout')
        .then(() => {
          Auth.deauthenticateUser()
          this.setState({
            user: null,
            isUserLoggedIn: false,
            userToken: null
          })
        })
        .then (() => {
          this.checkUserLoggedIn()
        })
  }

  checkUserLoggedIn = async () => {
    try {
      const user = await axios.get("/api/auth/isUserLoggedIn");
      console.log(user.data.user.name)
      if(user.data.user.name === Auth.getToken()){
        
        this.setState({
          isUserLoggedIn: Auth.isUserAuthenticated(),
          userToken: Auth.getToken(),
          user: user.data.user
        })
      } else {
        await this.logoutUser()
        Auth.deauthenticateUser()
      }
      
    } catch (err) {
      if (err.message.includes(401)) {
        this.setState({
          loadingUser: false
        })
      }
    }
    // console.log('Checking if user logged in');
  }

  renderAuthContainer = () => {
    const { isUserLoggedIn } = this.state;
    return <AuthContainer checkUserLoggedIn={this.checkUserLoggedIn} isUserLoggedIn={isUserLoggedIn} setUser={this.setUser} />
  }

  renderHome = (routeprops) => {
    return <Home routeprops={routeprops} user={this.state.user} />
  }

  renderVideo = (routeprops) => {
    return <VideoPage routeprops={routeprops} user={this.state.user}/>
  }

  renderVideoForGuest = (routeprops) => {
    if(this.state.user){
      return <VideoPage routeprops={routeprops} user={this.state.user} />
    }
    else {
      let user = {name: `Guest_${Math.floor(Math.random() * 999) + 1}`};
      return <VideoPage routeprops={routeprops} user={user} />
    }
  }

  renderAccount = (routeprops) => {
    return <Account routeprops={routeprops} user={this.state.user} />
  }

  // __redirect = (isUserLoggedIn) => {
  //   let { location } = this.props
  //   if (isUserLoggedIn) {
  //     if(location.pathname === '/home') {
  //       return <Redirect to='/home' />
  //     } else if(location.pathname === '/account') {
  //       return  <Redirect to='/account' />
  //     } else if(location.pathname === '/') {
  //       return  <Redirect to='/home' />
  //     }
  //   }
  // }

  render() {
    const { isUserLoggedIn } = this.state;
    const { router, params, location, routes } = this.props

    return (
      <div className="App">
        <Navbar
            user={this.state.user}
            logoutUser={this.logoutUser}
            isUserLoggedIn={isUserLoggedIn}
        />

        <Switch>
            <PrivateRoute path='/home' render={this.renderHome} isUserLoggedIn={isUserLoggedIn} />
            <Route path='/privateroom/:id/:title/:time/:privateKey' render={this.renderVideoForGuest} />
            <PrivateRoute path='/showroom/:id/:title/:time/' render={this.renderVideo} isUserLoggedIn={isUserLoggedIn}/>
            <PrivateRoute path='/account' render={this.renderAccount} isUserLoggedIn={isUserLoggedIn} />
            <Route path='/login' render={this.renderAuthContainer} />
            <Route path='/signup' render={this.renderAuthContainer} />
            <Route path='/about' component={About} />
            <Route path='/' component={MainPage} />
        </Switch>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(App);