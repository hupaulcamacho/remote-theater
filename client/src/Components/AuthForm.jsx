import React, {useState} from 'react'
import axios from "axios"

const AuthForm = () => {
    const [name, setName] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [isSignUpForm, setSignUpForm] = useState(false);
    const [isloggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState("");
  
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {     
           let res =  await axios.post(`http://localhost:3001/auth/login`, {email:email, password:password})
            let {payload} = res.data;
                sessionStorage.currentUserid = payload.id;
                // console.log(body.user.id)
                window.location.href = "/main"
                window.location.href.reload();
                setLoggedIn(true)
            
        } catch (err) {
            console.log(err)
            setMessage("username and password invaild")
        }
    }

    const signupForm = e =>{
        e.preventDefault();
        setSignUpForm(!isSignUpForm)
    }

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
setLoggedIn(true);
let {payload} = res.data;
sessionStorage.currentUserid = payload.id;
window.location.href = "/main"
window.location.href.reload();
}catch(error){
setMessage("User Already exists or invalid")
}
    }
    
    if(!isSignUpForm){
    return (
        <div className= "login">
            <form id="login" onSubmit={handleSubmit}>
                <input className="login" type="text" placeholder="Enter Email" required onChange={(e)=> setEmail(e.target.value)}></input>
                <input className="login" type="text" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)}></input>                     <br />
                <button className="loginBtn" >Login</button>
                <button className="signupBtn" onClick={signupForm}>Sign Up</button>
            </form>
        </div>
    )
  } else{
      return (
          <div className= "signup">
              <form id="signup"> 
                <input className="signup" type="text" placeholder="Enter Name" required onChange={(e)=> setName(e.target.value)}></input>
                <input className="signup" type="text" placeholder="Enter Email" required onChange={(e)=> setEmail(e.target.value)}></input>
                <input className="signup" type="text" placeholder="Enter Password" required onChange={(e)=> setPassword(e.target.value)}></input>
                <button className="loginBtn" onClick={signupForm}>Login</button>
                <button className="signupBtn" onClick={handleSignup}>Sign Up</button>
                </form>
          </div>
      )
  }  
}



export default AuthForm;