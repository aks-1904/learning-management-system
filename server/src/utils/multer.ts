import multer from "multer";

const upload = multer({ dest: "uploads/" }); // create uploads folder for files
export default upload;
