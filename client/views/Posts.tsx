import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
// import EditPostModal from "../components/ModalEditBlog";
import { Post } from "../src/types/customTypes";
import { Link } from "react-router-dom";

function Posts() {
  // State to track user input
  const [inputText, setInputText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  //we form data, it's empty. that's a built-in object
  // State to hold form data (description, user name, email, and selected file)
  const [formData, setFormData] = useState({
    description: "",
    userName: "",
    email: "",
    brand: "",
    // blogImage: '',
  });
  // State to track the selected file
  const [selectedFile, setSelectedFile] = useState<File | String>("");
  // State to store the list of blog posts
  const [posts, setPosts] = useState<Post[]>([]);
  
  // State variables for the update form
  // const [editingPost, setEditingPost] = useState<Post>({});
  // const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Function to handle changes in the search input
  const inputChangeHandler = (e) => {
    // When the user types in the search input, this function updates the 'inputText' state with the text.
    // console.log("event.target.value :>> ", e.target.value);
    const text = e.target.value;
    setInputText(text);

    // filter posts based on the input text
    const filteredPost = posts.filter((post) => {
      return (
        post.description.toLowerCase().includes(text.toLowerCase()) ||
        post.brand.toLowerCase().includes(text.toLowerCase())
      );
    });
    // Update the filtered posts
    setFilteredPosts(filteredPost);
  };

  //here goes our handler of post
  // Function to handle the form submission (creating a new blog post)
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
   
    // console.log('e ', e.target.value);
    // Create a new FormData object to send the form data (description, user name, email, and selected file)
    const formdata = new FormData();
    formdata.append("description", formData.description);
    formdata.append("userName", formData.userName);
    formdata.append("email", formData.email);
    formdata.append("blogImage", selectedFile as File); // we use it
    formdata.append("brand", formData.brand);
    
    try {
      // Send a POST request to create a new blog post with the provided data
      const response = await fetch(
        "http://localhost:5001/api/posts/createBlogPost",
        {
          method: "POST",
          body: formdata,
        }
      );
      // Handle the response here
      const result = await response.json();
      //attach the url received in the response to the formData variable , e.g.: setFormData({...formData, userImage:result.image})
      // do another fetch request to an endpoint sending the formData , now with all the information already available
      const updatedPostsResponse = await fetch(
        "http://localhost:5001/api/posts/all"
        );
        const updatedPostsData = await updatedPostsResponse.json();
        // Update local state with the updated data
        setPosts(updatedPostsData.allPosts);
        setFilteredPosts(updatedPostsData.allPosts);
        alert ('save success');
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // Fetch the list of blog posts when the component mounts
  useEffect(() => {
    // Fetch the list of blogs from API
    fetch("http://localhost:5001/api/posts/all")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.allPosts);
        setFilteredPosts(data.allPosts);
      })

      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleBlogInput = (e) => {
    // ChangeEvent<HTMLTextAreaElement>
    // const handleBlogInput = (e:ChangeEvent<HTMLInputElement>) => {
    // this one isn't working because i overwrite formdata each time:
    // setFormData({ ...formData, description: e.target.value })
    // setFormData({ ...formData, userName: e.target.value })
    // setFormData({ ...formData, email: e.target.value })
    // setFormData({ ...formData, brand: e.target.value })

    const { name, value } = e.target;

    // Update the specific property in the formData based on the input field's "name"
    setFormData((prevData) => ({
      //spreading the existing formData
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle changes in the selected file input
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setFormData({ ...formData, userImage: e.target.files[0] });
    //we update the selectedFile state
    setSelectedFile(e.target.files![0]);
  };

  // // function to handle update
  // const handleUpdateClick = (post:Post) => {
  //   //to store post data i want to edit and have prefill to be able to modify
  //   setEditingPost(post);
  //   //to show update form to user
  //   setShowUpdateForm(true); // Set a state to show the update form
  // };
  // // Function to handle closing the modal
  // const handleCloseModal = () => {
  //   setShowUpdateForm(false);
  // };
  // // Function to handle post updates
  // const handleUpdatePost = (updatedPost) => {

  //    // Remove the 'blogImage' property from the updated post
  // const { blogImage, ...postWithoutImage } = updatedPost;

  //   //PUT request to update
  //   fetch('http://localhost:5001/api/posts/update', {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(postWithoutImage),
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         // if successful update, close the modal
  //         handleCloseModal();
  //         // fetchPosts();
  //       } else {
  //         console.error("update failed");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("network error", error);
  //     });
  // };

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
        {/* <button onSubmit={handleSearchSubmit}>go</button> */}
      </div>

      <h2>Hey you! Don't go away! Post it!</h2>
      <div>
        <form className="input-form" onSubmit={handlePostSubmit}>
          <textarea
            name="description"
            onChange={handleBlogInput}
            placeholder="tell us something about what you gonna post..."
            value={formData.description}
            // onChange={(e) =>
            // setFormData({ ...formData, description: e.target.value })
            // }
          />
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            id="userName"
            placeholder="your user name..."
            onChange={handleBlogInput}
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
            value={formData.email}
            onChange={handleBlogInput}
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
            value={formData.brand}
            onChange={handleBlogInput}
            // onChange={(e) =>
            //   setFormData({ ...formData, brand: e.target.value })
            // }
          />
          <label htmlFor="brand">brand</label>

          <input
            type="file"
            name="blogImage"
            id="file"
            onChange={handleImageChange}
            // onChange={(e) =>}
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
          {/* here we use map function to display posts/ filtered as well */}
          {/* we used to display all posts, now only filtered ones */}
          {/* {Posts && Posts.map((post) => ( */}
          {filteredPosts &&
            filteredPosts.map((post) => (
              <li key={post._id} className="blog-list-item">
                {/* Add a div for the heart symbol */}
                <div>
                  <button className="heart-icon-button">
                    {/* <img
                    src={'https://res.cloudinary.com/dzghua4dz/image/upload/v1698834043/project4mern/epmegfonsab1egutezpz.png'}  
                className="heart-icon" */}
                    {/* /> */}
                  </button>
                  <Link to={`/edit/${post._id}`} className="update-blog-post"> </Link>
                  <Link to={`/delete/${post._id}`} className="delete-blog-post"> </Link>
                  {/* <button
                    className="update-blog-post"
                    onClick={() => handleUpdateClick(post)}
                  ></button> */}
                </div>
                {/* Modal for editing posts
                <EditPostModal
                  isOpen={showUpdateForm}
                  editPost={editingPost}
                  onClose={handleCloseModal}
                  onSave={handleUpdatePost}
                /> */}

                {/* // </div>{" "} */}
                {/* <i className="fa-regular fa-heart"></i> */}

                {post.blogImage && (
                  <div className="zoom-container">
                    <img
                      src={post.blogImage}
                      alt={post.userName}
                      className="blog-image zoom-image"
                    />
                  </div>
                )}
                <div className="description-post">
                  <h4>{post.description}</h4>
                  <p>from: {post.userName}</p>
                  <p>at: {post.email}</p>
                  <p>brand: {post.brand}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Posts;
