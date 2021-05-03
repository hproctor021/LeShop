import path from 'path' 
import express from 'express'
import multer from 'multer'

const router = express.Router

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        //        file name         date uploladed    gets the extension name from file (ex: png jpg etc)
    }
}) 


function checkFileType(file, cb){
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if( extname && mimetype ){
        return cb(null, true)
        //    null is the error(no error) true means it complys with the file types we are requiring to upload
    } else {
        cb('Images only')
    }

}


const upload = multer({ storage, fileFilter: ((req, file, cb) => checkFileType(file, cb)) })
//basically passing this as middleware


router.post('/', upload.single('image'), (req, res) => {
    //only uploading a single file so use upload.single & call that upload 'image
    // using'/' b/c this file will be associated with /api/upload in server.js
    res.send(`/${req.file.path}`)
    //returns the path
} )

export default router