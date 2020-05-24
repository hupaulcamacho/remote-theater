import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import PrivateRoute from './Components/PrivateRoute';
import AuthContainer from './Containers/AuthContainer';

import Navbar from './testComponents/Nav';
import VideoPage from './Components/VideoPage';
import Main from './Components/Main';
import Signup from './Components/Signup';
import Account from './Components/Account';
import Home from './testComponents/Home'
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

  renderMain = (routeprops) => {
    return <Main routeprops={routeprops} user={this.state.user} />
  }

  renderVideo = (routeprops) => {
    return <VideoPage routeprops={routeprops} user={this.state.user}/>
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
            <PrivateRoute path='/main' render={this.renderMain} isUserLoggedIn={this.state.isUserLoggedIn} />
            <PrivateRoute path='/showroom/:id/:title' render={this.renderVideo} isUserLoggedIn={this.state.isUserLoggedIn}/>
            <PrivateRoute path='/account' render={this.renderAccount} isUserLoggedIn={this.state.isUserLoggedIn} />
            <Route path='/login' render={this.renderAuthContainer} />
            <Route path='/signup' render={this.renderAuthContainer} />
            <Route path='/home' component={Home} />
            <Route path='/about' component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;