// import { useState } from 'react'

import { useEffect, useState } from "react";
import Login from "../views/Login";
import Register from "../views/Register";

// import './App.css'

function App() {

  //router


  
  const [isUserLogged, setIsUserLogged] = useState(false);
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    //or shorter in one line what's below
    return token ? true : false
    // if (token){
    //     return true
    // }else {
    //    return false 
    // }
};

const logout = () => {
  localStorage.removeItem("token");
  setIsUserLogged (false);
}

useEffect(() => {
  const isLoggedIn = isUserLoggedIn();
  if (isLoggedIn) {
    console.log("user is logged in");
    setIsUserLogged(true);
  }else {
    console.log("user is not logged in");
    setIsUserLogged(false);
  }
}, [isUserLogged]);

  return (
    <>
     <h1>Store</h1> 
     <hr />
    <button onClick={logout}>logout</button>
     <hr />
     <Register/>
     <hr />
     <Login/>
     <hr />
    </>
  );
}

export default App;
