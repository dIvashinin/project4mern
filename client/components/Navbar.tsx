// import React from 'react';
import { NavLink } from "react-router-dom";



function Navbar() {
  return (
    <nav className="navbar">
      <NavLink className="about" to={"about"}>About</NavLink> <NavLink className="posts" to={"posts"}>Blog</NavLink> <NavLink className="register" to={"register"}>Register</NavLink> <NavLink className="login" to={"login"}>Login</NavLink> <NavLink className="profile" to={"profile"}>Profile</NavLink>
    </nav>
  );
}

export default Navbar;
