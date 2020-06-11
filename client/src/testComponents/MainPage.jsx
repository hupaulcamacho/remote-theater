import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slideshow from './Slideshow'
import '../Components/CSS/Mainpage.css'
import './Slideshow.css'

import logo from './logo.jpg'
import slide1 from "./assets/slide1.jpg";
import slide2 from "./assets/slide2.jpg";
import slide3 from "./assets/slide3.jpg";

const s = {
    container: "screenW screenH dGray col",
    header: "flex1 fCenter fSize2",
    main: "flex8 white",
    footer: "flex1 fCenter"
};

const slides = [slide1, slide2, slide3];

class MainPage extends Component {
    render() {
        return (
        <div className="login">
            
            <div className='main'>
            <img className='logo' src={logo} height="350px"/> <br/>
            <h1 id="rt" >Remote Theater</h1>
            
                <Link to='/login'>
                    <button className='button1'> Log In </button>
                </Link>
                <Link to='/signup'>
                    <button className='button1'> Sign Up </button>
                </Link> 
            </div>
  
            <div className={s.container}>
                <div className={s.main}>
                    <Slideshow slides={slides} />
                </div>
            </div>
            
        </div>
        )

    }
}

export default MainPage