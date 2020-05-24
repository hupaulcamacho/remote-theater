import React from 'react'
import './CSS/About.css'


const About = () => {
return(
    <div>
        <h1>Remote Theater</h1>
        <br/>
        <p className="about">
        Remote Theater is an application created using React, Express-Node.js, CSS Javascript and HTML. Our Application allows users to watch 
         movies as if they were in a real movie theater. Every movie will have a specific showtime for when users can watch and will be locked if that 
         showtime hasn't started or has already ended, once in the showroom users are able to leave comments and reactions in the chatbox while the movie is playing. We also 
         created a rating option so that users can see how other users rated a specific moive. To help with movie preference we wanted users to be able to select
          preferences on the kind of movies they enjoy so that all the movies suggested are to the users likes. 
<br/>
          For future features we want to implement private rooms where users can host their own movie night with family and friends and be able to stream the movies
          they want to watch. 
        </p>
    </div>
)
}

export default About;