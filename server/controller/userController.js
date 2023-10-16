import {v2 as cloudinary} from 'cloudinary';
import userModel from '../models/userModel.js';

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

//create new user

try {
    const newUser = new userModel({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.userName,
      userImage: req.body.userImage,
    })
} catch (error) {
    
}

};

export {uploadImage, register};