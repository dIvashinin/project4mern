import { v2 as cloudinary } from "cloudinary";
import blogModel from "../models/blogModel.js";

const uploadImage2 = async (req, res) => {
  // console.log("upload image controller working");
  // console.log("req.body.description :>> ", req.body.description);
  // console.log("req.body.userName :>> ", req.body.userName);
  // console.log("req.body.email :>> ", req.body.email);
  // console.log("req.file :>> ", req.file);

  if (req.file) {
    // if there's a field called "file" in the request, we try to upload file to cloudinary
    try {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "project4mern",
      });
      console.log("uploadedImage :>> ", uploadedImage);
      // res.status(200).json({
      //   message: "image uploaded successfully",
      //   userImage: uploadedImage.secure_url,
      // });
      // if uploadedImage is successful (returns a valid object), save that URL into the user collection
      // create a new blogModel, with 1st the fields comming inside req.body , and 2nd with the uploadedImage.secureUrl as userImage.
      try {
      const newBlogPost = new blogModel({
        blogImage: uploadedImage.secure_url,
        description: req.body.description,
        userName: req.body.userName,
        email: req.body.email,
        brand: req.body.brand,
        
      });
      console.log('newBlogPost :>> ', newBlogPost);
      const savedBlog = await newBlogPost.save()
      //after doing that, send a response to the client, confirming that the  upload has been sucessful, and maybe including the object the new blog.
      res.status(201).json({
        msg: "new blogpost created!",
        blog: {
          blogImage: savedBlog.blogImage,
        description: savedBlog.description,
        userName: savedBlog.userName,
        email: savedBlog.email,
        brand: savedBlog.brand
      }
      })
      }catch (error) {
        console.log('error creatin blog post', error);
        res.status(500).json({
          msg: 'smth went wrong creating a blog post',
        });
      }
      

    } catch (error) {
      console.log("error :>> ", error);
    }
  } else {
    res.status(500).json({
      error: "file type is not supported",
    });
  }
};

const getAllPosts = async (req, res) => {
  // console.log('req :>> ', req);

  try {
    //we make 2 requests to DB here - find and populate. We need to think about how many operations are ok for us
    const allPosts = await blogModel.find();
    //this is if i have a field which i wanna populate. in this case i don't have it
    // .populate("user");

    console.log("allPosts :>> ", allPosts);
    if (allPosts.length < 1) {
      res.status(204).json({ message: "no blogs" });
    } else {
      res.status(200).json({
        number: allPosts.length,
        allPosts,
      });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "something went wrong in the server",
    });
  }
};

// const register2 = async (req, res) => {
//   try {
//     //create new user
//     const newUser = new userModel({
//       userName: req.body.userName,
//       email: req.body.email,
//       //   password: req.body.userName, // it's not coming from here. it needs to be hashed
//       password: hashedPassword,
//       blogImage: req.body.blogImage,
//     });
//     const savedUser = await newUser.save();
//     res.status(201).json({
//       msg: "new user registered",
//       user: {
//         userName: savedUser.userName,
//         email: savedUser.email,
//         blogImage: savedUser.blogImage,
//       },
//     });
//   } catch (error) {
//     console.log("error saving user:>> ", error);
//     res.status(500).json({
//       msg: "something went wrong registering the user",
//     });
//   }
// };

export { uploadImage2, getAllPosts };
