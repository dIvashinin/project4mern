import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
    userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
//   password: {
//     type: String,
//     required: true,
//   },
blogImage: {
    type: String,
    required: false,
  },

  brand: {
    type: String,
    required: true,
  }
});

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;
