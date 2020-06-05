import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Ul = styled.nav`
display: flex;
flex-flow: row nowrap;

.title{
        padding: 15px 0;
    }

.nav-link{
    padding: 18px 10px;
}

@media (max-width: 768px){
flex-flow: column nowrap;
background-color: gray;
position: fixed;
transform: ${({ open }) => open ? 'translateX(0)' : 'translate(100%)'};
top: 0;
right: 0;
height: 100vh;
width: 300px;
padding-top: 3.5rem;

.nav-link:hover{
    background-color: rgb(135, 96, 207);
}
`;

const RightNav = ({ logoutUser, isUserLoggedIn, open }) => {

    if (isUserLoggedIn) {
        return (
            <>
               <div>
                <Link to='/home'>
                    <span className='title'>RemoteTheater</span>
                </Link>
            </div>
                <Ul open={open}>
                    <Link className='nav-link' to='/home'>Home</Link>{" "}
                    <Link className='nav-link' to='/account'>My Account</Link>{" "}
                    <Link className='nav-link' to="/About">About</Link>
                    <Link className='nav-link' onClick={logoutUser}>Log Out</Link>
                </Ul>
            </>

        )
    }

    return (
        <>
            <div>
                <Link to='/mainpage'>
                    <span className='title'>RemoteTheater</span>
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