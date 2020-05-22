import React from 'react'
import { Link, Redirect } from 'react-router-dom'

const Nav = () => {

    const LogoutButton = () => {
        const handleLogOff = () => {
            console.log('logging out')
            sessionStorage.removeItem("currentUserid")
           return <Redirect to='/' /> 
        };
        return(
            
                <button id="logout" onClick={handleLogOff}>Log Out</button>
          
        )
    }

        return (
            <div className='nav-container'>
                <nav>
                    <div className='links'>
                        <span className='title'>RemoteTheater</span>
                        <Link className='nav-link' to='/main'>Main</Link>{" "}
                        <Link className='nav-link' to='/account'>My Account</Link>{" "}
                        <Link className='nav-link' to="/about">About</Link>
                        <Link to="/"><LogoutButton className='nav-link' /></Link>
                    </div>
                </nav>
            </div>
        )
    
 
    
}

export default Nav;
