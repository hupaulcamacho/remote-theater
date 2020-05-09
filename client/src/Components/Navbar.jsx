import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {

    const LogoutButton = () => {
        const handleLogOff = () => {
            console.log('logging out')
            sessionStorage.removeItem("currentUserid")
            window.location.href = "/"
            window.location.href.reload();  
        };
        return(
            <Link to ={"/"}>
                <button id="logout" onClick={handleLogOff}>Log Out</button>
            </Link>
        )
    }

        return (
            <div className='nav-container'>
                <nav>
                    <div className='links'>
                        <span className='title'>RemoteTheater</span>
                        <Link className='nav-link' to='/main'>Main</Link>{" "}
                        {/* <Link to="/Showrooms">Showrooms</Link>{" "} */}
                        <Link className='nav-link' to='/account'>My Account</Link>{" "}
                        <Link className='nav-link' to="/About">About</Link>
                        <LogoutButton className='nav-link' />
                    </div>
                </nav>
            </div>
        )
    
 
    
}

export default Nav;
