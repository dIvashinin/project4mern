// import { useState } from 'react'

import { useEffect } from "react";
import Login from "./views/Login";
import Register from "./views/Register";

// import './App.css'

function App() {
  
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
useEffect(() => {
  const isLoggedIn = isUserLoggedIn();
  if (isLoggedIn) {
    console.log("user is logged in");
  }else {
    console.log("user is not logged in");
  }
}, []);

  return (
    <>
     <h1>Store</h1> 
     <hr />
    <button>logout</button>
     <hr />
     <Register/>
     <hr />
     <Login/>
     <hr />
    </>
  );
}

export default App;
