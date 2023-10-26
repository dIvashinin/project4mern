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
  userImage: {
    type: String,
    required: false,
  },
});

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;
