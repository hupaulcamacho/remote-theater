import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({ logoutUser, isUserLoggedIn, user }) => {
    if (isUserLoggedIn) {
        return (
            <div className='nav-container'>
                <nav className='main-nav'>
                    <div className='links'>
                        <span className='title'>RemoteTheater</span>
                        <Link className='nav-link' to='/main'>Main</Link>{" "}
                        <Link className='nav-link' to='/account'>My Account</Link>{" "}
                        <Link className='nav-link' to="/About">About</Link>
                        <button className='button1' onClick={logoutUser}>Log Out</button>
                    </div>
                </nav>
            </div>
            
        )
    }

    return (
        <div className='nav-container'>
            <nav className='main-nav'>
                <div className='links'>
                <span className='title'>RemoteTheater</span>
                    <Link className='nav-link' to='/home'>Home</Link>{" "}
                    <Link className='nav-link' to='/login'>Log-In</Link>{" "}
                    <Link className='nav-link' to='/signup'>Sign-Up</Link>{" "}
                    <Link className='nav-link' to='/about'>About</Link>  
                </div>
            </nav>
        </div>
        
    )
}

export default NavBar