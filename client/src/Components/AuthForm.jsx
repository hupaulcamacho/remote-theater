import React from 'react'
import axios from "axios"
import './CSS/AuthForm.css'
import {Redirect, Link} from 'react-router-dom'
import Signup from '../Components/Signup'

const AuthForm = ({isloggedIn, isSignUpForm, setMessage, setLoggedIn, password, setPassword, email, setEmail, setSignUpForm, message }) => {
  
    const handleLogin = async (e) => {
        e.preventDefault()
        try {     
           let res =  await axios.post(`http://localhost:3001/auth/login`, {email:email, password:password})
            let { payload } = res.data;
            setLoggedIn(true)
            sessionStorage.currentUserid = payload.id;

        } catch (err) {
            console.log(err)
            setMessage("username and password invaild")
        }
    }

    // const signupForm = e =>{
    //     e.preventDefault();
    //     setSignUpForm(!isSignUpForm)
    // }

    if(isloggedIn){
        return  <Redirect from="/" to= "/main" />
    }
    
    if(!isSignUpForm){
    return (
        <div className= "login">
            <h1 id="rt" >Remote Theater</h1>
            <form id="login" onSubmit={handleLogin}>
                <input className="login" type="text" placeholder="Enter Email" required onChange={(e)=> setEmail(e.target.value)}></input>
                <input className="login" type="password" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)}></input>                     <br />
                <button className="button1" >Login</button>
                <Link to={"/signup"}>
                <button className="button1">Sign Up</button>
                </Link>
            </form>
        </div>
    )
  } else {
    return (
        <Signup />
    )
  }  
}



export default AuthForm;