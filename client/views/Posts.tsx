import React, { useState, useEffect } from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Posts() {
  const [inputText, setInputText] = useState("");

  const inputChangeHandler = (event) => {
    console.log("event.target.value :>> ", event.target.value);
    const text = event.target.value;
    setInputText(text);
  };

  const [selectedFile, setSelectedFile] = useState<File | String>("");



  // const [users, setUsers] = useState([]);

  // useEffect(() =>{
  // Fetch the list of users from API
  // fetch('http://localhost:5001/api/users/all')
  // .then((response) => response.json())
  // .then((data) => setUsers(data.allUsers))
  // .catch((error) => console.error('Error fetching users:', error));
  // }, []);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the list of blogs from API
    fetch("http://localhost:5001/api/posts/all")
      .then((response) => response.json())
      .then((data) => setPosts(data.allPosts))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      {/* <h2>Products</h2> */}

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
          // onSubmit={handleSubmitPost}
        >
          <input
            type="text"
            name="description"
            id="description"
            placeholder="description..."
            // onChange={handlePostInput}
          />
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="user name..."
            // onChange={handlePostInput}
          />
          <label htmlFor="userName">user name</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email..."
            // onChange={handlePostInput}
          />
          <label htmlFor="email">email</label>

          <input
            type="file"
            name="file"
            id="file"
            // onChange={handleFileInput}
          />
          <button
            type="submit"
            // onSubmit={handlePostSubmit}
          >
            post it
          </button>
        </form>
      </div>

      {/* <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>User: {user.userName}</p>
            <p>Email: {user.email}</p> */}
      {/* Display the user's image */}
      {/* {user.userImage && <img src={user.userImage} alt={user.userName} />}
          </li>
        ))}
      </ul>
    </div> */}

      <div>
        {/* <Container fluid>
<Row>
<Col xs={12} sm={6} md={4} lg={3} xl={3} className="card-inside"> */}
        {/* <Link to={`${blogs._id}`}> */}
        {/* <Image  */}
        {/* //   className="image-responsive" */}
        {/* //   src={blogs.userImage} */}
        {/* //   alt="Avatar" */}
        {/* //   style={{ width: "220px", height: "270px" }} */}
        {/* /> */}
        {/* <div className="hover-text"> */}
        {/* Additional text to display on hover */}
        {/* <p>click for details</p> */}
        {/* </div> */}
        {/* </Link> */}
        {/* <div> */}
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
        {/* </div> */}
        {/* </Col>
    </Row>
    </Container> */}
      </div>
    </div>
  );
}

export default Posts;
