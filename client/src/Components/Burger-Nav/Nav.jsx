import React from 'react';
import styled from 'styled-components'
// import { Link } from 'react-router-dom';
import Burger from './Burger'

const Nav = styled.nav`
width:100%;
height: 100%;

border-bottom: 2px solid #ccc;
// padding: 0 2px;
display: flex;
justify-content: space-between;
background-color: #2b1a68;

@media(max-width: 768px) {
width: 103vw;
}
`

const Navigation = ({ logoutUser, isUserLoggedIn, user }) => {
    // console.log(user)
    return (
        <Nav>
            <Burger 
                user={user}
                isUserLoggedIn={isUserLoggedIn}
                logoutUser={logoutUser}
            />
        </Nav>


    )
}

export default Navigation