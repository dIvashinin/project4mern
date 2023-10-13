import multer from "multer";
// path is built-in in node.js, we don't need to install it
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    // here goes logic t odecide if we accept file user is uploading or not
    console.log('file :>> ', file);
    // const extension = path.extname();
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // To reject this file pass `false`, like so:
    // cb(null, false);
  
    // To accept the file pass `true`, like so:
    // cb(null, true);
  
    // You can always pass an error if something goes wrong:
    // cb(new Error('I don\'t have a clue!'));
  
  };

  const multerUpload = multer({ storage, fileFilter });

  export default multerUpload;