// import React from 'react'
// import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
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

const updateBlogPost = async (e) => {
e.preventDefault();
try {

    const response = await fetch(`http://localhost:5001/api/posts/all/${id}`,
    {method: "PUT",
headers: {
    "Content-Type": "application/json",
},
body: JSON.stringify(blog),
});
if (!response.ok) {
    throw new Error (`http error! Status: $(response.status)`);
}
        alert ('edit success');
        navigate('/posts');
    
} catch (error) {
   alert ('edit error'); 
}
};

const deleteBlogPost = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/all/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Delete success");
      navigate('/posts');
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete error");
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
      <h1> edit </h1>
      <div>
        <form className="input-form" onSubmit={updateBlogPost}>
          <textarea
            name="description"
            // onChange={handleBlogInput}
            placeholder="tell us something about what you gonna post..."
            value={blog.description}
            onChange={(e) => setBlog({...blog, description: e.target.value})}
            // onChange={(e) =>
            // setFormData({ ...formData, description: e.target.value })
            // }
          />
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="userName"
            value={blog.userName}
            id="userName"
            placeholder="your user name..."
            onChange={(e) => setBlog({...blog, userName: e.target.value})}
            // onChange={handleBlogInput}
            // onChange={(e) =>
            //   setFormData({ ...formData, userName: e.target.value })
            // }
          />
          <label htmlFor="userName">user name</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="your email..."
            value={blog.email}
            onChange={(e) => setBlog({...blog, email: e.target.value})}
            // onChange={handleBlogInput}
            // onChange={(e) =>
            //   setFormData({ ...formData, email: e.target.value })
            // }
          />
          <label htmlFor="email">email</label>

          <input
            type="text"
            name="brand"
            id="brand"
            placeholder="what has been drunk?!"
            value={blog.brand}
            onChange={(e) => setBlog({...blog, brand: e.target.value})}
            // onChange={handleBlogInput}
            // onChange={(e) =>
            //   setFormData({ ...formData, brand: e.target.value })
            // }
          />
          <label htmlFor="brand">brand</label>

          {/* <input
            type="file"
            name="blogImage"
            id="file"
            onChange={handleImageChange}
            // onChange={(e) =>}
          /> */}
          <button
            type="submit"
            // onSubmit={handlePostSubmit}
          >
            edit it
          </button>

        </form>
        <button onClick={deleteBlogPost}>Delete</button>
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
