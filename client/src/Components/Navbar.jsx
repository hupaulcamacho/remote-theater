import React from 'react'

const Nav = () => {
    return (
        <div className='nav-container'>
            <nav>
                <div className='links'>
                    <Link to='/'>Home</Link>
                    <Link to="/Showrooms">Showrooms</Link>{" "}
                    <Link to="/About">About</Link>{" "}
                </div>
            </nav>
        </div>
    )
}

export default Nav;
