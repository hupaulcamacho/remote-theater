import React, { Component } from 'react'
import axios from 'axios';
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import '../Components/CSS/AuthForm.css'
import LoginForm from '../testComponents/LoginForm';
import SignupForm from '../testComponents/SignupForm';

class AuthContainer extends Component {
    state = {
        name: '',
        password: '',
        email: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signupUser = async () => {
        // make network request to /auth/signup to register user
        console.log('Signing up user ...')
        console.log(this.state)
        try {
            await axios.post('/api/auth/signup', this.state)
            this.loginUser()
        } catch (err) {
            console.log(err)
        }
    }

    loginUser = async () => {
        // make network request to /auth/signup to register user
        try {
            const { data } = await axios.post('/api/auth/login', { email : this.state.email, password: this.state.password } )

            const user = data.payload
            this.props.setUser(user)
            console.log(data)
        } catch (err) {
            console.log(err)
        } 
    }

    renderSignUp = () => {
        const { name, password, avatar_url, email } = this.state
        return (
        <SignupForm 
            handleChange={this.handleChange}
            name={name}
            password={password}
            email={email}
            signupUser={this.signupUser}
            avatar_url={avatar_url}
        />)
    }

    renderLogin = () => {
        const { email, password } = this.state
        return (
        <LoginForm 
            handleChange={this.handleChange}
            email={email}
            password={password}
            loginUser={this.loginUser}
        />)
    }

    render() {
        const { isUserLoggedIn } = this.props
        return (
            <div className='main'>  
                {
                    isUserLoggedIn
                    ? <Redirect to="/home" />
                    : (
                        <Switch>
                            <Route path="/login" render={this.renderLogin} />
                            <Route path="/signup" render={this.renderSignUp} />
                        </Switch> 
                    )
                }
                <Link to='/mainpage'>
                    <button className='button1'>Back to Home</button>
                </Link>
            </div>
        )
    }
}

export default AuthContainer