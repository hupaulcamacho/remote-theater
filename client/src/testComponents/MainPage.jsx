import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'

class Mainpage extends Component {
    render() {
        return (
        <div className= "login">
            <h1 id="rt" >Remote Theater</h1>
            <div className='redirect-buttons'>
                <Link to='/login'>
                    <button className='button1'> Log In </button>
                </Link> 
                <Link to='/signup'>
                    <button className='button1'> Sign Up </button>
                </Link>
            </div>
        </div>
        )
    }
}

export default Mainpage
