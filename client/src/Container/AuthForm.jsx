import React, {Component} from 'react'
import axios from "axios"
// import {Link} from 'react-router-dom'

class AuthForm extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            name: "",
            password: "",
            message: ""
        }
    }

    handleSubmit = async (e) => {
       
        e.preventDefault()
        try {
            let userEmail = this.state.email
            let userPassword = this.state.password
            await axios.post(`http://localhost:3001/auth/login`, {email: userEmail, password: userPassword})
            console.log(userEmail, userPassword)
            if (userEmail && userPassword) {
                this.props.logIn(userEmail, userPassword)
            }
        } catch (err) {
            this.props.history.push("/Signup")
        }
    }

    handleEmail = (e) => {
        console.log(e.target.value)
        this.setState({
            email: e.target.value
        })
    }

    handlePassword = (e) => {
        console.log(e.target.value)
        this.setState({
            password: e.target.value
        })
    }


    render() {
        let {message} = this.state
        return (
           
<div>
                <form id="login" onSubmit={this.handleSubmit}>
                    <input className="login" type="text" placeholder="Enter Email" required onChange={this.handleEmail}></input>
                    <input className="login" type="text" placeholder="Enter Password" required onChange={this.handlePassword}></input>
                    <br />
                    <button className="loginBtn">Login</button>
                    <br />
                    {/* <Link to="/SignUp"><button className="signBtn">Sign Up</button></Link> */}
                </form>

            <p>{message}</p>
        </div>
        )
    }
}

export default AuthForm;