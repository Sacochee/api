const multer = require('multer')


const M_TYPE = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/gif" : "gif",
    "image/png" : "png"
}

const Storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, 'image/')
    },
    filename : (req, file, cb)=>{
        const name = file.originalname.split(' ').join("-").split(".")
        const ext = M_TYPE[file.mimetype]
        const cbName = `${name[0]}_${Date.now()}.${ext}`
        cb(null,cbName)
    }
    
})

module.exports = multer({storage:Storage})
