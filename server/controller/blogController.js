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
        console.log("newBlogPost :>> ", newBlogPost);
        const savedBlog = await newBlogPost.save();
        //after doing that, send a response to the client, confirming that the  upload has been sucessful, and maybe including the object the new blog.
        res.status(201).json({
          msg: "new blogpost created!",
          blog: {
            blogImage: savedBlog.blogImage,
            description: savedBlog.description,
            userName: savedBlog.userName,
            email: savedBlog.email,
            brand: savedBlog.brand,
          },
        });
      } catch (error) {
        console.log("error creatin blog post", error);
        res.status(500).json({
          msg: "smth went wrong creating a blog post",
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

    // console.log("allPosts :>> ", allPosts);
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

const getSinglePost = async(req,res) =>{
  try {
    const {id} = req.params;
    const singlePost = await blogModel.findById(id);
    res.status(200).json(singlePost);
  } catch (error) {
    res.status(500).json({
      error: "something went wrong in the server",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const {id} = req.params;
    const singlePost = await blogModel.findByIdAndUpdate(id, req.body, {new:true});
    if(!singlePost){
      return res.status(404).json({
        message: `cannot find blog post with ID ${id}`
      })
    }res.status(200).json(singlePost)
    
  } catch (error) {
    res.status(500).json({
      error: "something went wrong in the server",
    });
  }
}

const deleteBlog = async (req, res) => {
  try {
    const {id} = req.params;
    const singlePost = await blogModel.findByIdAndDelete(id);

    if(!singlePost){
      return res.status(404).json({
        message: `cannot find blog post with ID ${id}`
      })
    }res.status(200).json(singlePost)

  } catch (error) {
    res.status(500).json({
      error: "something went wrong in the server",
    });
  }
}

  // console.log("updateImg ok :>> ", updateBlog);
  // console.log('req :>> ', req);
  // console.log("req.params :>> ", req.params);
  // console.log("req.body :>> ", req.body);
  // console.log('post._id :>> ', post._id);
  //1. if it is the image...the image will arrive in req.file
  //2.rest of the fields: should be sent in the req.body
  //3.use a moongoose method ...findByIdAndUpdate
  // const updatedBlog = await blogModel.findByIdAndUpdate(req.body.blogId, {text: req.body.text},{new:true})
  // console.log('updatedBlog :>> ', updatedBlog);
  // if (req.file) {
  //   // if there's a field called "file" in the request, we try to upload file to cloudinary
  //   try {
  //     const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
  //       folder: "project4mern",
  //     });
  // Find the specific blog post by its unique identifier (e.g., post ID)
  // const postId = req.params.id;
  // console.log('postId :>> ', postId);
  //     const blogPost = await blogModel.findById(postId);

  //     if (!blogPost) {
  //       return res.status(404).json({
  //         error: "blog post not found",
  //       });
  //     }
  //     //saving new image URL in a variable
  //     const newBlogImageURL = uploadedImage.secure_url;
  //     //updating blog properties with the new ones
  //     blogPost.blogImage = newBlogImageURL;
  //     blogPost.description = req.body.description;
  //     blogPost.userName = req.body.userName;
  //     blogPost.email = req.body.email;
  //     blogPost.brand = req.body.brand;
  //     // const updatedBlogPost = {
  //     //     blogImage: uploadedImage.secure_url,
  //     //     description: req.body.description,
  //     //     userName: req.body.userName,
  //     //     email: req.body.email,
  //     //     brand: req.body.brand,
  //     //   };
  //     //saving it
  //     const updatedSavedBlogPost = await blogPost.save();

  //     //now we have it saved so can delete the old one
  //     // first check if there's an old image url to delete
  //     //if exists and is truthy && not equal to the new url
  //     if (blogPost.blogImage && blogPost.blogImage !== newBlogImageURL) {
  //       //splitting url at "/project4mern" segment
  //       //[1] is taking the part of url after the segment
  //       //split is splitting filename from extension = public ID
  //       const publicId = blogPost.blogImage
  //         .split("/project4mern/")[1]
  //         .split(".")[0];
  //       //destroy method takes public ID as parameter
  //       await cloudinary.uploader.destroy(publicId);
  //     }

  //     res.status(200).json({
  //       msg: "blog post updated successfully",
  //       blog: updatedSavedBlogPost,
  //     });
  //   } catch (error) {
  //     console.log("error updating blog:>> ", error);
  //     res.status(500).json({
  //       msg: "smth went wrong updating",
  //     });
  //   }
  // } else {
  //   res.status(500).json({
  //     error: "file type is not supported",
  //   });
// };
// }
// };

// console.log("uploadedImage :>> ", uploadedImage);
// res.status(200).json({
//   message: "image uploaded successfully",
//   userImage: uploadedImage.secure_url,
// });
// if uploadedImage is successful (returns a valid object), save that URL into the user collection
// create a new blogModel, with 1st the fields comming inside req.body , and 2nd with the uploadedImage.secureUrl as userImage.
//       try {
//       const newBlogPost = new blogModel({
//         blogImage: uploadedImage.secure_url,
//         description: req.body.description,
//         userName: req.body.userName,
//         email: req.body.email,
//         brand: req.body.brand,

//       });
//       console.log('newBlogPost :>> ', newBlogPost);
//       const savedBlog = await newBlogPost.save()
//       //after doing that, send a response to the client, confirming that the  upload has been sucessful, and maybe including the object the new blog.
//       res.status(201).json({
//         msg: "new blogpost created!",
//         blog: {
//           blogImage: savedBlog.blogImage,
//         description: savedBlog.description,
//         userName: savedBlog.userName,
//         email: savedBlog.email,
//         brand: savedBlog.brand
//       }
//       })
//       }catch (error) {
//         console.log('error creatin blog post', error);
//         res.status(500).json({
//           msg: 'smth went wrong creating a blog post',
//         });
//       }

//     } catch (error) {
//       console.log("error :>> ", error);
//     }
//   } else {
//     res.status(500).json({
//       error: "file type is not supported",
//     });
//   }
// };

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

export { uploadImage2, getAllPosts, getSinglePost, updateBlog, deleteBlog };
