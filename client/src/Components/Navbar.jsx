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
                        <Link to='/main'>Main</Link>{" "}
                        <Link to="/Showrooms">Showrooms</Link>{" "}
                        <Link to="/About">About</Link>
                        <Link to="/"><LogoutButton /></Link>
                    </div>
                </nav>
            </div>
        )
    
 
    
}

export default Nav;
