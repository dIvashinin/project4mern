import {v2 as cloudinary} from 'cloudinary';

const uploadImage = async (req, res) => {
// console.log("upload image controller working");
console.log('req.file :>> ', req.file);

// upload file to cloudinary
try {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);
    console.log('uploadedImage :>> ', uploadedImage);
} catch (error) {
   console.log('error :>> ', error); 
}



};

export {uploadImage};