import multer from "multer";


const upload = multer({
    storage:multer.memoryStorage(),
    limits : { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

})

export default upload.single("resume");