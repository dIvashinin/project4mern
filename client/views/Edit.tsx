// import React from 'react'
// import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditPage = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState({
    description: "",
    userName: "",
    email: "",
    brand: "",
  });
  const getBlog = async () => {

try {
    const response = await fetch(`http://localhost:5001/api/posts/all/${id}`,
    {method: "GET"}
        );

        if (!response.ok) {
            throw new Error(`http error! Status: $(response.status)`);
        }
        const data = await response.json();
        setBlog({
            description: data.description,
            userName: data.userName,
            email: data.email,
            brand: data.brand,
        })
        console.log("data :>> ", data);
    
} catch (error) {
    console.log("error :>> ", error);
}

    };
useEffect(() => {
 getBlog();
}, [])

  return (
    <div>
      {/* <h2>Home</h2>
      <h1 className="home-about-firstline">This is about Berlin.</h1> */}
      <h3> edit </h3>
      <h2> edit</h2>
      <h1> edit {id}</h1>
      <div>
        {blog.description}
      </div>
      {/* <NavLink to="/posts">
        <img
          className="eingang-picture"
          src="https://res.cloudinary.com/dzghua4dz/image/upload/f_auto,q_auto/v1/project4mern/ywkkgwbu8eydeeiqvsko"
          alt="Berlin"
        />
      </NavLink>
     */}
    </div>
  );
};

export default EditPage;
