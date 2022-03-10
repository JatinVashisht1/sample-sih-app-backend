const express = require("express");
const User = require("../db/User")
const router = express.Router();
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/sih", () => {
    console.log("connected")
},
e => console.log("error occured while connecting to mongodb: ", e.message))

// router.use(uploadData)
// this will parse json for us!
router.use(express.json())

async function findData(){
    let user;
    await User.find({}, function(err, res){
        if(err) throw err;
        console.log("res is " + res)
        user = res;
    })
    
    return user
}

router.get('/all', (req, res) => {
    // let data = findData()
    User.find({}, function(err, result){
        if(err) throw err;
        console.log("res is " + res)
        res.send(result)
    })
    // console.log(data)
    // res.status(200).send(data)
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

router.post('/upload', (req, res) => {
    console.log("post request hit")
    let file = req.body
    uploadData(file);
    res.send({name: "Post request"})
    
})

function uploadData(file){
    try{
        let myUser = new User(file)
        
        myUser.save()
        console.log("user saved! ", myUser)

    }catch(err){
        console.log(`an error occurred while uploading data:  ${err.message}`)
    }
    // res.send({uploadStatus: "data saved successfully"})
    // next();
}

module.exports = router