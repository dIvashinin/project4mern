// import React from 'react';
import  {Link} from "react-router-dom";

function Navbar() {
  return (
    
    <nav>
        <Link to={"about"}>About</Link> |  
         <Link to={"products"}>Products</Link> | 
         <Link to={"register"}>Register</Link> | 
         <Link to={"login"}>Login</Link>
    </nav>
    
  );
}

export default Navbar;