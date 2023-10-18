import {v2 as cloudinary} from 'cloudinary';
import userModel from '../models/userModel.js';
import { hashPassword, verifyPassword } from '../utils/passwordServices.js';
import { generateToken } from '../utils/tokenServices.js';

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
        //check if user already exists
        const existingUser = await userModel.findOne({email: req.body.email})

        if (existingUser) {
            res.status(200).json( {
                message: "email already exists in the DB"
            })
        } else {
            // if there's no such user, we create new user
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
        }
 
} catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({
        msg:"something went wrong",
    });
}
};

const login = async (req, res) => {
// console.log("login controller");
console.log('req.body :>> ', req.body);
//check if the user exists in our DB
//we need email or id
//findOne or findByID can be used
try {
    const existingUser = await userModel.findOne({email:req.body.email})
    if (!existingUser) {
        // if user doesn't exist, send appropriate response to the client
        res.status(404).json({
            msg:"no user found with this email",
        });
    } else {
// if user exists in our DB, we check password and we need bcrypt again - check password
const checkPassword = await verifyPassword(req.body.password, existingUser.password);

if (!checkPassword) {
    //this means received password dont match the one in DB
    res.status(400).json({
        msg: "wrong password, try again",
    });
}
if (checkPassword) {
    //this means received password MATCH the one in DB
   //generate token JWT
    const token = generateToken(existingUser._id); 
    if (token) {
      //all ok: email exists, password correct, token is generated 
      res.status(200).json({
        msg: "login successful",
        //and it's useful to send some (! not the password) info about the user to front-end
        user: {
            userName:existingUser.userName,
            email:existingUser.email,
            userImage:existingUser.userImage
        },
        token,
      });
    } else {
        console.log("error generating token");
        res.status(400).json({
            msg: "smth went wrong with your request",  
    });

   res.status(200).json({
    msg: "you are logged in",
});
    }
}

} 
} catch (error) {
   res.status(500).json({
    msg:"i dont have a clue",
   });
}

}
export {uploadImage, register, login};