import { useState } from "react";

function Products() {
  const [inputText, setInputText] = useState("");

  const inputChangeHandler = (event) => {
    console.log("event.target.value :>> ", event.target.value);
    const text = event.target.value;
    setInputText(text);
  };

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
    </div>
  );
}

export default Products;
