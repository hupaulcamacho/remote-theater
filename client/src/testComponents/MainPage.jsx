import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import '../Components/CSS/Mainpage.css'

class Mainpage extends Component {
    render() {
        return (
        <div className= "login">
            <h1 id="rt" >Remote Theater</h1>
  
            {/* <div className='redirect-buttons'>
                <Link to='/login'>
                    <button className='button1'> Log In </button>
                </Link>
                <Link to='/signup'>
                    <button className='button1'> Sign Up </button>
                </Link> */}
            <div className= "photo-container">
                   <img src = "Endgame-Lead-1.jpg" alt="endgame" className="imgs"/>
                   <img src = "EWKA_Avatar_SequelsTop.jpg" alt="Avator" className="imgs"/>
                   <img src = "mulan.jpeg" alt="Mulan" className="imgs"/>
                   {/* <img src = "dora-the-explorer.jpg" alt="dora" className="imgs" /> */}
            </div>
        </div>
        // </div>
        )
    }

export default Mainpage