const bodyparser = require("body-parser");
const express = require("express");
const User = require("../db/User")
const router = express.Router();
const mongoose = require("mongoose");
const fileUpload = require('../images/savetodisk')
const multer = require("multer")
mongoose.connect("mongodb://localhost/sih", () => {
    console.log("connected")
},
e => console.log("error occured while connecting to mongodb: ", e.message))

router.use(bodyparser.json({extended:true}))
router.use(bodyparser.urlencoded({ extended: true}))


router.get('/all', (req, res) => {

    User.find({}, function(err, result){
        if(err) throw err;
        console.log("res is " + res)
        res.send(result)
    })
    
})

router.get('/person/:mid', (req, res)=>{

    let mid = req.params.mid
    console.log("mid is ", mid)
    User.find({mid: mid}, function(err, result){
        if(err) throw err;
        console.log("result is " + result)
        res.status(200).send(result)
    })

});

router.post('/test', (req, res) => {

    console.log(req.body.user);
    console.log(req.body.workerImg);
    res.send("ok")

})

router.post('/upload', (req, res) => {

    console.log("post request hit")
    let file = req.body.data
    console.log("data is "+file)
    fileUpload(req, res, (err)=> {
        if(err){
            res.send(err);
        }else if(req.file == undefined){
            res.send("please select an image");
        }else{
            console.log("file upload success");
            res.send("File uploaded successfully");
        }
    })

})

module.exports = router