import React, { useState } from 'react';

function EditPostModal({ editPost, isOpen, onClose, onSave }) {
  const [editedPost, setEditedPost] = useState(post);

  const handleSave = () => {
    onSave(editedPost);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Edit Post</h2>
        <form>
        <textarea
            name="description"
            onChange={(e) => setEditedPost({...editedPost, description: e.target.value})}
            value={editedPost.description}
           
            />
          <input
            type="text"
            onChange={(e) => setEditedPost({ ...editedPost, userName: e.target.value })}
            value={editedPost.userName}
          />
          <input
            type="text"
            value={editedPost.email}
            onChange={(e) => setEditedPost({ ...editedPost, email: e.target.value })}
          />
          <input
            type="text"
            value={editedPost.brand}
            onChange={(e) => setEditedPost({ ...editedPost, brand: e.target.value })}
          />
          <input
            type="file"
            value={editedPost.blogImage}
            onChange={(e) => setEditedPost({ ...editedPost, blogImage: e.target.value })}
          />

          {/* Add more form fields for other post details */}
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditPostModal;

