import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Products() {
  const [inputText, setInputText] = useState("");

  const inputChangeHandler = (event) => {
    console.log("event.target.value :>> ", event.target.value);
    const text = event.target.value;
    setInputText(text);
  };
  
  const [users, setUsers] = useState([]);

  useEffect(() =>{
    // Fetch the list of users from API
    fetch('http://localhost:5001/api/users/all')
      .then((response) => response.json())
      .then((data) => setUsers(data.allUsers))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const [blogs, setBlogs] = useState([]);

  useEffect(() =>{
    // Fetch the list of blogs from API
    fetch('http://localhost:5001/api/blogs/all')
      .then((response) => response.json())
      .then((data) => setBlogs(data.allBlogs))
      .catch((error) => console.error('Error fetching blog:', error));
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

<Container fluid>
<Row>
<Col xs={12} sm={6} md={4} lg={3} xl={3} className="card-inside">
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
        {blogs && blogs.map((blog) => (
          <li key={blog._id} className="blog-list-item">
            <p>Description: {blog.description}</p>
            <p>User: {blog.userName}</p>
            <p>Email: {blog.email}</p>
            {blog.userImage && <Image src={blog.userImage} alt={blog.userName} className="blog-image" />}
          </li>
        ))}
      </ul>
    {/* </div> */}
    </Col>
    </Row>
    </Container>
    </div>
  );
}

export default Products;
