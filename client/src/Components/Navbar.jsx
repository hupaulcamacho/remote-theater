import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (currentUserid) => {

    const LogoutButton = () => {
        const handleLogOff = () => {
            console.log('logging out')
            sessionStorage.removeItem(currentUserid)
        };
        return(
            <Link to ={"/"}>
                {" "}
                <button onClick={handleLogOff}>Log Out</button> {" "}
            </Link>
        )
    }

        return (
            <div className='nav-container'>
                <nav>
                    <div className='links'>
                        <Link to='/main'>Main</Link>{" "}
                        <Link to="/Showrooms">Showrooms</Link>{" "}
                        <Link to="/About">About</Link>{" "}
                        <LogoutButton />
                    </div>
                </nav>
            </div>
        )
    
 
    
}

export default Nav;
