import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  state = {
    user: null,
    isUserLoggedIn: false,
    loadingUser: true
  }

  componentDidMount() {
    this.checkUserLoggedIn();
  }

  setUser = (user) => {
    this.setState({
      user: user,
      isUserLoggedIn: true,
      loadingUser: false
    });
  }

  checkUserLoggedIn = async () => {
    try {
      const { data } = axios.get("/api/auth/isUserLoggedIn");
      this.props.setUser(data.payload);
    } catch (err) {
      if (err.message.includes(401)) {
        this.setState({
          loadingUser: false
        })
      }
    }
    console.log('Checking if user logged in');
  }

  renderAuthContainer = () => {
    const { isUserLoggedIn } = this.state;
    return <AuthContainer isUserLoggedIn={isUserLoggedIn} setUser={this.setUser} />
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
    else{
      let user = {name: `Guest_${Math.floor(Math.random() * 999) + 1}`};
      return <VideoPage routeprops={routeprops} user={user} />
    }
  }

  renderAccount = (routeprops) => {
    return <Account routeprops={routeprops} user={this.state.user} />
  }

  logoutUser = async () => {
    console.log('logging out user');
    try {
      await axios.get('/api/auth/logout');
      this.setState({
        user: null,
        isUserLoggedIn: false
      });
      this.props.history.push('/');
    } catch (err) {
      console.log('ERROR', err);
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar
            user={this.state.user}
            logoutUser={this.logoutUser}
            isUserLoggedIn={this.state.isUserLoggedIn}
        />

        <Switch>
            <PrivateRoute path='/home' render={this.renderHome} isUserLoggedIn={this.state.isUserLoggedIn} />
            <Route path='/privateroom/:id/:title/:time/:privateKey' render={this.renderVideoForGuest} />
            <PrivateRoute path='/showroom/:id/:title/:time/' render={this.renderVideo} isUserLoggedIn={this.state.isUserLoggedIn}/>
            <PrivateRoute path='/account' render={this.renderAccount} isUserLoggedIn={this.state.isUserLoggedIn} />
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

export default App;