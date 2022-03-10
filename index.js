const express = require('express');
const path = require("path")
const route = require('./routes/routes')
const app = express()
const port = 3000

// specifying our middleware (router)
app.use('/', route)

// app.get('/', (req, res)=>{
//     console.log("get request hit!");
//     res.send({name: "Demo SIH App"})
// })

app.listen(port, ()=> {
    console.log(`app listening at http://localhost:${port}`)
})
