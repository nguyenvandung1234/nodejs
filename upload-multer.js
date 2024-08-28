const multer = require('multer');

var mystorage = multer.diskStorage({
    destination: (req,file , callback)=>{
        callback(null,'public/images');
    },
    filename: (req,file , callback)=>{
        callback(null,file.originalname);
    },
});

var upload = multer({storage:mystorage});

module.exports = upload;