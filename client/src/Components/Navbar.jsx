import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    const LogoutButton = () => {
        const handleLogOff = () => {
            sessionStorage.removeItem("currentUserid")
        };
        return(
            <Link to ={"/"}>
                {" "}
                <button onCLick={handleLogOff}>Log Out</button> {" "}
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
