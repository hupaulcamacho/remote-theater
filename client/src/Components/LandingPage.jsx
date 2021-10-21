import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slideshow from '../testComponents/Slideshow'
// import '../Components/CSS/Mainpage.css'
import './Slideshow.css'

import logo from './logo.jpg'
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpeg";
import slide6 from "../assets/slide6.jpg";



const s = {
    container: "screenW screenH dGray col",
    header: "flex1 fCenter fSize2",
    main: "flex8 white",
    footer: "flex1 fCenter"
};

const slides = [slide6, slide1, slide2, slide3, slide4, slide5];

class LandingPage extends Component {
    render() {
        return (
        <div className="login">
            
            <div className='main'>
            <img className='logo' src={logo} height="350px" alt="logo" /> <br/>
            <h1 id="rt" >Remote Theater</h1>
                <Link to='/home'>
                    <button className='button1'> Enter Theater </button>
                </Link>
                {/* <Link to='/login'>
                    <button className='button1'> Log In </button>
                </Link>
                <Link to='/signup'>
                    <button className='button1'> Sign Up </button>
                </Link>  */}
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

export default LandingPage