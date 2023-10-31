import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Posts() {
  // State to track user input
  const [inputText, setInputText] = useState("");
// Function to handle changes in the search input
  const inputChangeHandler = (e) => {
    // When the user types in the search input, this function updates the 'inputText' state with the text.
    // console.log("event.target.value :>> ", e.target.value);
    const text = e.target.value;
    setInputText(text);
  };
//we form data, it's empty. that's a built-in object
// State to hold form data (description, user name, email, and selected file)
  const [formData, setFormData] = useState({
    description: '',
    userName: '',
    email: '',
    // userImage: '',
  });
// State to track the selected file
  const [selectedFile, setSelectedFile] = useState<File | String>("");

  //here goes our handler of post
  // Function to handle the form submission (creating a new blog post)
  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('e ', e.target.value);
// Create a new FormData object to send the form data (description, user name, email, and selected file)
    const formdata = new FormData();
    formdata.append('description',formData.description);
    formdata.append('userName',formData.userName);
    formdata.append('email',formData.email);
    formdata.append('userImage',selectedFile); // we use it

    try {
      // Send a POST request to create a new blog post with the provided data
      const response = await fetch ('http://localhost:5001/api/posts/createBlogPost', {
        method: 'POST',
        body: formdata,
      });
// Handle the response here
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  // const [selectedFile, setSelectedFile] = useState<File | String>("");

// State to store the list of blog posts
  const [posts, setPosts] = useState([]);
// Fetch the list of blog posts when the component mounts
  useEffect(() => {
    // Fetch the list of blogs from API
    fetch("http://localhost:5001/api/posts/all")
      .then((response) => response.json())
      .then((data) => setPosts(data.allPosts))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

// Function to handle changes in the selected file input
  const handleImageChange = (e) => {
    // setFormData({ ...formData, userImage: e.target.files[0] });
    //we update the selectedFile state
    setSelectedFile(e.target.files[0]); 
  };
  return (
    <div>

      <div className="searchbar">
        <input
          id="mySearchInput"
          className="search-input"
          type="text"
          placeholder="search me..."
          onChange={inputChangeHandler}
        />
      </div>

      <h2>Hey you! Don't go away! Post it!</h2>
      <div>
        <form
          className="input-form"
          onSubmit={handlePostSubmit}
        >
          <textarea name="description" placeholder="description..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="userName"
            value= {formData.userName}
            id="userName"
            placeholder="user name..."
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          />
          <label htmlFor="userName">user name</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email..."
            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <label htmlFor="email">email</label>

          <input
            type="file"
            name="userImage"
            id="file"
            onChange={handleImageChange}
          />
          <button
            type="submit"
            // onSubmit={handlePostSubmit}
          >
            post it
          </button>
        </form>
      </div>

      <div>
        
        <h2>Blog</h2>
        <ul className="blog-list">
          {posts &&
            posts.map((post) => (
              <li key={post._id} className="blog-list-item">
                <div className="heart-icon"></div>{" "}
                {/* Add a div for the heart symbol */}
                {post.userImage && (
                  <Image
                    src={post.userImage}
                    alt={post.userName}
                    className="blog-image"
                  />
                )}
                <div className="description-post">
                  <p>Description: {post.description}</p>
                  <p>User: {post.userName}</p>
                  <p>Email: {post.email}</p>
                </div>
              </li>
            ))}
        </ul>
       
      </div>
    </div>
  );
}

export default Posts;
