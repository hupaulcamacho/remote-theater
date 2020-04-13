import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className='nav-container'>
            <nav>
                <div className='links'>
                    <Link to='/'>Home</Link>{" "}
                    <Link to='/main'>Main</Link>{" "}
                    <Link to="/Showrooms">Showrooms</Link>{" "}
                    <Link to="/About">About</Link>{" "}
                </div>
            </nav>
        </div>
    )
}

export default Nav;
