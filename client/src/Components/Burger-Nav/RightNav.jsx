import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logo from './logo.jpg'


const Ul = styled.nav`
display: flex;
flex-flow: row nowrap;

.nav-link{
    padding: 0.5em;

    margin-right: 1em;

}

@media (max-width: 768px){
flex-flow: column nowrap;
background-color: #2b1a68;
position: fixed;
transform: ${({ open }) => open ? 'translateX(0)' : 'translate(100%)'};
top: 0;
right: 0;
height: 100vh;
width: 300px;
padding-top: 3.5rem;
z-index: 99;

.nav-link{
    padding: 1.5em;
}
}
`;

const RightNav = ({ logoutUser, isUserLoggedIn, open, user }) => {
    // console.log(user)
    if (isUserLoggedIn) {
        return (
            <>
                <div className='logo'>
                    <Link to='/home'>
                        <img src={logo} height="50px" alt='logo'/>
                    </Link>
                </div>
                <Ul open={open}>
                    {/* <p className='username'>{user.name}</p>  */}
                    
                    {/* <Link className='nav-link' to='/home'>Home</Link>{" "} */}
                    <Link className='nav-link' to='/account'>My Account</Link>{" "}
                    <Link className='nav-link' to="/About">About</Link>
                    <Link className='nav-link' onClick={logoutUser}>Log Out</Link>
                </Ul>
            </>

        )
    }

    return (
        <>
            <div className='logo'>
                <Link to='/'>
                    <img className='logo' src={logo} height="50px" alt='logo'/>
                </Link>
            </div>
            
            
            <Ul open={open}>
                <Link className='nav-link' to='/login'>Login</Link>{" "}
                <Link className='nav-link' to='/signup'>Sign Up</Link>{" "}
                <Link className='nav-link' to='/about'>About</Link>
            </Ul>
       </>
    )
}

export default RightNav