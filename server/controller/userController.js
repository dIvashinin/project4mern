import {v2 as cloudinary} from 'cloudinary';

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

export {uploadImage};