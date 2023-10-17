import {v2 as cloudinary} from 'cloudinary';
import userModel from '../models/userModel.js';
import { hashPassword } from '../utils/hashPassword.js';

const uploadImage = async (req, res) => {
// console.log("upload image controller working");
console.log('req.file :>> ', req.file);

if (req.file) {
    // if there's a field called "file" in the request, we try to upload file to cloudinary
    try {
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {folder:"project4mern"});
        console.log('uploadedImage :>> ', uploadedImage);
        res.status(200).json({
            message: "image uploaded successfully",
            userImage: uploadedImage.secure_url,
        });
        // if uploadedImage is successful (returns a valid object), save that URL into the user collection
    } catch (error) {
       console.log('error :>> ', error); 
    }
} else{
    res.status(500).json({
        error: "file type is not supported"
    });
}
};

const register = async (req, res) => {
    // console.log("register controller working");
// receive all the newUser info (sent by client) in the body of the request
//process that info and store in the DB
console.log('req.body :>> ', req.body);
// destructured version
// const {userName, email, password, userImage } = req.body

//before creating new user we need to hash user password by using Bcrypt

try {
    const hashedPassword = await hashPassword (req.body.password) 
    if (hashedPassword) {

        try {
    //create new user
            const newUser = new userModel({
              userName: req.body.userName,
              email: req.body.email,
            //   password: req.body.userName, // it's not coming from here. it needs to be hashed
                password: hashedPassword,
              userImage: req.body.userImage,
            });
            const savedUser = await newUser.save()
            res.status(201).json({
                msg: "new user registered",
                user:{
                    userName:savedUser.userName,
                    email: savedUser.email,
                    userImage: savedUser.userImage
                }
            })
        } catch (error) {
            console.log('error saving user:>> ', error);
            res.status(500).json({
                msg:"something went wrong registering the user",
            });
        }
    }
} catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({
        msg:"something went wrong",
    });
}
};

export {uploadImage, register};