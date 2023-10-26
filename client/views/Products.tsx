import React, { useState, useEffect } from "react";

function Products() {
  const [inputText, setInputText] = useState("");

  const inputChangeHandler = (event) => {
    console.log("event.target.value :>> ", event.target.value);
    const text = event.target.value;
    setInputText(text);
  };
  
  const [users, setUsers] = useState([]);

  useEffect(() =>{
    // Fetch the list of users from your API
    fetch('http://localhost:5001/api/users/all')
      .then((response) => response.json())
      .then((data) => setUsers(data.allUsers))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  

  return (
    <div>
      <h2>Products</h2>

      <div className="searchbar">
        <input
          id="mySearchInput"
          className="search-input"
          type="text"
          placeholder="search me..."
          onChange={inputChangeHandler}
        />
      </div>

      <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>User: {user.userName}</p>
            <p>Email: {user.email}</p>
            <p>User Image: {user.userImage}</p>
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
}

export default Products;
