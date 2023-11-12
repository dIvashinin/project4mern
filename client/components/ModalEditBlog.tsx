import React, { useState } from "react";
import { Post } from "../src/types/customTypes";
interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (a: any) => void;
  editPost: Post;
}

function EditPostModal({
  editPost,
  isOpen,
  onClose,
  onSave,
}: EditPostModalProps) {
  // Destructure the editPost data
  const { description, userName, email, brand } = editPost || {};

  // const [editedPost, setEditedPost] = useState(editPost || {

  //   description: '',
  //   userName: '',
  //   email:'',
  //   brand: '',
  // });

  // Create separate state variables for each input
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [editedUserName, setEditedUserName] = useState(userName || "");
  const [editedEmail, setEditedEmail] = useState(email || "");
  const [editedBrand, setEditedBrand] = useState(brand || "");

  // Handle changes to input fields
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(`Input changed: name=${name}, value=${value}`);
  //   console.log('editedPost :>> ', editedPost);
  //   setEditedPost({ ...editedPost, [name]: value });
  // };

  const handleSave = () => {
    const updatedPost = {
      description: editedDescription,
      userName: editedUserName,
      email: editedEmail,
      brand: editedBrand,
    };

    // const handleSave = () => {
    onSave(updatedPost);
    onClose();
    // };
  };
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Edit Post</h2>
        <form>
          <textarea
            name="description"
            onChange={(e) => setEditedDescription(e.target.value)}
            value={editedDescription}
            // onChange={handleInputChange}
            // onChange={(e) => setEditedPost({...editedPost, description: e.target.value})}
            // value={editedPost.description}
          />
          <label htmlFor="description">description</label>
          <input
            name="userName"
            type="text"
            onChange={(e) => setEditedUserName(e.target.value)}
            value={editedUserName}
            // onChange={handleInputChange}
            // value={editedPost.userName}
            // onChange={(e) => setEditedPost({ ...editedPost, userName: e.target.value })}
          />
          <label htmlFor="userName">user name</label>
          <input
            name="email"
            type="text"
            onChange={(e) => setEditedEmail(e.target.value)}
            value={editedEmail}
            // onChange={handleInputChange}
            // value={editedPost.email}
            // onChange={(e) => setEditedPost({ ...editedPost, email: e.target.value })}
          />
          <label htmlFor="email">email</label>
          <input
            name="brand"
            type="text"
            onChange={(e) => setEditedBrand(e.target.value)}
            value={editedBrand}
            // onChange={handleInputChange}
            // onChange={(e) => setEditedPost({ ...editedPost, brand: e.target.value })}
            // value={editedPost.brand}
          />
          <label htmlFor="brand">brand</label>
          {/* <input
            type="file"
            value={editedPost.blogImage}
            onChange={(e) => setEditedPost({ ...editedPost, blogImage: e.target.files![0] })}
          /> */}

          {/* Add more form fields for other post details */}
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
export default EditPostModal;
