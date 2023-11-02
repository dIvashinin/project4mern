// import { useState } from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  //  Link,
  Outlet,
} from "react-router-dom";

// import { useEffect, useState } from "react";
import Login from "../views/Login";
import Register from "../views/Register";
import About from "../views/About";
import MyNavbar from "../components/Navbar";
// import Products from "../views/Products";
import Posts from "../views/Posts";
import ErrorPage from "../views/ErrorPage";
import Details from "../views/Details";
import Home from "../views/Home";




// import './App.css';

function App() {
  //router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element = {<Home/>} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:details" element={<Details />} />
        <Route path="about" element={<About />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="*" element = {<ErrorPage/>} /> */}
      </Route>
    )
  );

  //   const [isUserLogged, setIsUserLogged] = useState(false);
  //   const isUserLoggedIn = () => {
  //     const token = localStorage.getItem("token");
  //     //or shorter in one line what's below
  //     return token ? true : false
  //     // if (token){
  //     //     return true
  //     // }else {
  //     //    return false
  //     // }
  // };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setIsUserLogged (false);
  // }

  // useEffect(() => {
  //   const isLoggedIn = isUserLoggedIn();
  //   if (isLoggedIn) {
  //     console.log("user is logged in");
  //     setIsUserLogged(true);
  //   }else {
  //     console.log("user is not logged in");
  //     setIsUserLogged(false);
  //   }
  // }, [isUserLogged]);

  return (
    <>
      {/* <hr /> */}

      <RouterProvider router={router} />
      <Outlet />
      {/* <h1>Store</h1> */}
      {/* <button onClick={logout}>logout</button> */}
      <hr />
      {/* <Register/> */}
      {/* <hr /> */}
      {/* <Login/> */}
      {/* <hr /> */}
    </>
  );
}
const Root = () => {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
};
export default App;
