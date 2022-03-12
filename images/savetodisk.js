const multer = require("multer");
const { readFile } = require("fs");
const path = require("path");
const { extname } = require("path");
const fs = require("fs")
const User = require("../db/User")

function uploadData(file) {
    try {
        let myUser = new User(file)
        // console.log("file is " + file.body)
        myUser.save()
        console.log("user saved! ", myUser)

    } catch (err) {
        console.log(`an error occurred while uploading data:  ${err.message}`)
    }
    // res.send({uploadStatus: "data saved successfully"})
    // next();
}

function getJsonObject(stringOfJson) {
    let stringified = JSON.stringify(stringOfJson)
    let jsonobject = JSON.parse(stringified)
    let addressObj = JSON.parse(jsonobject.address)
    let withoutAddObject = jsonobject
    delete withoutAddObject['address']
    withoutAddObject['address'] = addressObj
    return withoutAddObject
}

// setting up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let mybody = req.body
        let workerData = getJsonObject(mybody)
        let filename = workerData.mid
        console.log("file is ", file)
        const path = `./uploads/${filename}`
        fs.mkdirSync(path, { recursive: true })
        uploadData(workerData)

        return cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname));
    }
})

function checkFileType(file, cb) {
    // allowed files
    const fileTypes = /jpeg|jpg|png|/
    // check extension
    const extension = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // mime type
    const mimeType = fileTypes.test(file.mimeType)
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        return cb('choose a valid image type, excepted: jpeg, jpg, png');
    }
}

const upload = multer({
    storage: storage,
    // set limit
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('workerImg');


module.exports = upload