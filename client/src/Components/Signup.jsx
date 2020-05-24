import React, {useState} from 'react'
import './CSS/Signup.css'
import axios from "axios"
import './CSS/AuthForm.css'
import { Redirect, Link } from 'react-router-dom'



const Signup = ({isloggedIn, setMessage, setLoggedIn, password, setPassword, email, setEmail}) => {
    const[name, setName] = useState("")


    const handleSignup = async (e) => {
        e.preventDefault();
        if(name === "" || email === "" || password === ""){
            setMessage("Please fill out all fields")
        }else{
            signUp();
        }
    }

    const signUp = async () => {
        try{
        let res = await axios.post(`http://localhost:3001/auth/signup`, {name: name, email: email, password: password})
        let {payload} = res.data;
        setLoggedIn(true);
        sessionStorage.currentUserid = payload.id;
        }catch(error){
        setMessage("User Already exists or invalid")
        }
            }

           if(isloggedIn)
           { return <Redirect from="/signup" to="/main" />
           }
            

    return(
        <div className= "signup">
        <h1 id="rt">Remote Theater</h1>
          <form id="signup" onSubmit={handleSignup}> 
            <input className="signup" type="text" placeholder="Enter Name" required onChange={(e)=> setName(e.target.value)}></input>
            <input className="signup" type="text" placeholder="Enter Email" required onChange={(e)=> setEmail(e.target.value)}></input>
            <input className="signup" type="password" placeholder="Enter Password" required onChange={(e)=> setPassword(e.target.value)}></input>
            <br/>
            <button className="button1" onClick={handleSignup}>Sign Up</button>
            <Link to={"/"}>
                <button className="button1">Login</button>
                </Link>
            </form>
      </div>
    )
}


export default Signup;
