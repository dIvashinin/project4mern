// import React from 'react';
import { NavLink } from "react-router-dom";

function About() {
  return (
    <div>
      {/* <h2>About</h2> */}
      <h1 className="home-about-firstline">This is about Berlin.</h1>
      <h3> And it's people.</h3>
      <h2> Who drink.</h2>
      <h1> With a style.</h1>
      <NavLink to="/posts">
        <img
          className="eingang-picture"
          src="https://res.cloudinary.com/dzghua4dz/image/upload/f_auto,q_auto/v1/project4mern/ywkkgwbu8eydeeiqvsko"
          alt="Berlin"
        />
      </NavLink>
    
    </div>
  );
}

export default About;
